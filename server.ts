import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chatbot API Endpoint for Nutrition & Diet Consultation
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userContext, modelChoice } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    // Default to gemini-3.5-flash for general multi-turn consultation as requested
    const selectedModel = modelChoice === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';

    let contextString = '';
    if (userContext) {
      contextString = `\nCurrent User Health Profile:
- Age: ${userContext.age || 'N/A'}
- Biological Sex: ${userContext.gender || 'N/A'}
- Height: ${userContext.heightCm || 'N/A'} cm
- Weight: ${userContext.weightKg || 'N/A'} kg (Target: ${userContext.targetWeightKg || 'N/A'} kg)
- Calculated BMI: ${userContext.bmi || 'N/A'} (${userContext.category || 'N/A'})
- Basal Metabolic Rate (BMR): ${userContext.bmr || 'N/A'} kcal
- Total Daily Energy Expenditure (TDEE): ${userContext.tdee || 'N/A'} kcal
- Daily Calorie Target: ${userContext.targetCalories || 'N/A'} kcal (${userContext.calorieDeficitOrSurplus >= 0 ? '+' : ''}${userContext.calorieDeficitOrSurplus || 0} kcal deficit/surplus)
- Fitness Goal: ${userContext.fitnessGoal ? userContext.fitnessGoal.replace(/_/g, ' ') : 'N/A'}
- Dietary Preference: ${userContext.dietPreference || 'N/A'}
- Today's Calorie Intake so far: ${userContext.caloriesConsumed || 0} kcal
- Wearable Burn Today: ${userContext.wearableBurn || 0} kcal`;

      if (userContext.activePlanMeals && Array.isArray(userContext.activePlanMeals) && userContext.activePlanMeals.length > 0) {
        contextString += `\n\nActive Daily Meal Program (Courses currently prescribed):
${userContext.activePlanMeals
  .map(
    (m: any) =>
      `- [Slot: ${m.slot} | ${m.slotLabel || m.slot}] "${m.title}" (${m.calories} kcal, ${m.protein}g protein, ${m.carbs}g carbs, ${m.fats}g fats)`
  )
  .join('\n')}`;
      }
    }

    const systemInstruction = `You are NutriBot, a friendly, down-to-earth nutrition and meal wellness coach chatting with the user on Messenger.
Your personality: warm, empathetic, encouraging, and completely natural. You speak like a real person—the kind of supportive wellness guide someone loves texting with.
${contextString}

STRICT SAFETY AND NON-CLINICAL ADVICE POLICY (MANDATORY):
1. You provide general nutritional and culinary lifestyle guidance ONLY. You are NOT a medical doctor.
2. Under NO circumstances should you provide clinical advice, medical diagnoses, treatment plans, medication suggestions, or clinical prognoses.
3. If the user mentions ANY serious health problems, illness, chest pain, shortness of breath, dizziness, severe stomach pain, eating disorder symptoms, pregnancy complications, severe food allergies, chronic medical symptoms, or physical discomfort: THE MAXIMUM you must do is warmly and clearly advise them to visit or consult a qualified doctor or physician immediately.
4. Keep the boundary clear: "I can help with daily meals, calories, and wholesome recipes, but for any medical symptoms or serious health concerns, please see a qualified doctor."

Writing Style Guidelines:
1. Speak in a completely natural, conversational voice. Never sound robotic, textbook-like, or overly clinical. Avoid AI clichés like "As an AI", "Based on my analysis", "According to clinical guidelines", or "Here is a breakdown:".
2. Write in smooth, natural sentences and short conversational paragraphs. Avoid spamming rigid bullet points, numbered lists, or unnecessary markdown headers unless listing specific ingredients.
3. Keep nutritional advice simple, grounded, and practical. Explain things casually and clearly (e.g., say "it helps prevent an energy crash in the afternoon" rather than "it regulates glycemic variability").
4. Be supportive and validating. Acknowledge how hard dieting or staying consistent can be.
5. Keep your messages concise and punchy—just like a real Messenger chat message.
6. NO ASTERISKS OR HASH SIGNS: Do not use '*' or '**' asterisks or '#' hash symbols in your chat text. Never use asterisks for bolding or italics. For lists, use clean bullet dots (•) or dashes without asterisks.

When Proposing Meal Program Changes:
When the user asks to alter, swap, change, or improve a meal (e.g., wanting a lighter supper, more protein, different ingredients, or a new cuisine):
1. Acknowledge their preference naturally and explain why the new dish works so well for them in 2-3 warm, conversational sentences.
2. Directly and naturally ask them: "Would you like me to update your active meal program with this change?"
3. At the very end of your response, append the machine-readable proposal block inside \`\`\`json_meal_proposal:
\`\`\`json_meal_proposal
{
  "slot": "breakfast" | "snack_morning" | "lunch" | "snack_afternoon" | "supper" | "snack_evening",
  "slotLabel": "Course Name",
  "action": "replace_meal",
  "title": "Precise Dish Title",
  "description": "Appetizing 1-2 sentence description",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "fiber": number,
  "prepTime": "15 mins",
  "ingredients": ["150g Item", "1 tbsp Item", ...],
  "instructions": [
    "Step 1: Preparation detail...",
    "Step 2: Cooking technique & duration...",
    "Step 3: Plating & seasoning..."
  ],
  "chefTip": "Friendly kitchen or nutrition tip",
  "whatShouldBeEaten": "Why this meal is great for this time of day",
  "rationale": "Why this change fits their goal"
}
\`\`\`
NOTE: Only append the \`\`\`json_meal_proposal block when a concrete meal alteration or course replacement is being recommended. Do not include it for general chat or advice.`;

    // Map conversation history to Gemini contents format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const rawText = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

    // Parse potential json_meal_proposal block
    let cleanText = rawText;
    let proposal = null;

    const proposalMatch = rawText.match(/```json_meal_proposal\s*([\s\S]*?)\s*```/);
    if (proposalMatch) {
      try {
        proposal = JSON.parse(proposalMatch[1]);
        proposal.status = 'pending';
        // Strip the raw code block from the conversational text so the Messenger chat is clean
        cleanText = rawText.replace(/```json_meal_proposal[\s\S]*?```/, '').trim();
      } catch (parseErr) {
        console.error('Failed to parse json_meal_proposal:', parseErr);
      }
    }

    // Replace all * and # signs from the conversational text
    cleanText = cleanText
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/#/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\*/g, '•')
      .trim();

    return res.json({ text: cleanText, proposal });
  } catch (error: any) {
    console.error('Gemini Chatbot API Error:', error);
    return res.status(500).json({
      error: error?.message || 'An error occurred while generating nutritional consultation.',
    });
  }
});

// AI Camera Food Image Calorie & Macro Analysis Endpoint
app.post('/api/analyze-food-image', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    // Support simulated 503 to verify localized retry wrapper
    if (req.body.simulate503) {
      return res.status(503).json({
        error: 'Simulated AI Vision upstream service temporarily unavailable (HTTP 503).',
        code: 503,
        isUnavailable: true,
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    // Strip data URL header if present (e.g. "data:image/jpeg;base64,...")
    let rawBase64 = imageBase64;
    let detectedMime = mimeType || 'image/jpeg';
    if (imageBase64.includes(';base64,')) {
      const parts = imageBase64.split(';base64,');
      rawBase64 = parts[1];
      const match = parts[0].match(/data:(.*?)$/);
      if (match) detectedMime = match[1];
    }

    const imagePart = {
      inlineData: {
        mimeType: detectedMime,
        data: rawBase64,
      },
    };

    const promptText = `Analyze this image as an expert culinary dietitian and computer vision nutritionist.
Tasks:
1. Determine whether any food, meal, edible dish, grocery item, snack, or beverage is visible in this photo.
2. If NO edible food or beverage is identified (e.g. photo of an empty desk, laptop, human face, clothing, animal, furniture, scenery, or any non-food item):
   - Set "isFoodDetected" to false.
   - Set "noFoodMessage" to: "No food identified in the photo. Please capture a clear picture of a meal, snack, or beverage to estimate its calories."
   - Set "foodName" to "No food detected".
   - Set calories, protein, carbs, fats, fiber to 0.
3. If food IS identified:
   - Set "isFoodDetected" to true.
   - Set "foodName" to a concise descriptive name (e.g., "Avocado Toast with Poached Egg", "Grilled Salmon Bowl", "Pepperoni Pizza Slice").
   - Provide "estimatedPortion" (e.g., "1 standard plate (~350g)", "1 bowl", "2 slices").
   - Calculate realistic estimated total calories (kcal).
   - Estimate the macronutrients: protein (g), carbs (g), fats (g), and dietary fiber (g).
   - In "detectedItems", list individual visible components with their respective portions and calories.
   - In "healthAssessment", summarize key nutritional highlights and satiety index.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [imagePart, { text: promptText }],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFoodDetected: {
              type: Type.BOOLEAN,
              description: 'Whether food or beverage is present in the photo',
            },
            noFoodMessage: {
              type: Type.STRING,
              description: 'Explanatory message when no food is detected',
            },
            foodName: {
              type: Type.STRING,
              description: 'Name of the recognized dish or meal',
            },
            estimatedPortion: {
              type: Type.STRING,
              description: 'Estimated portion or serving size',
            },
            calories: {
              type: Type.INTEGER,
              description: 'Total estimated calories in kcal',
            },
            protein: {
              type: Type.NUMBER,
              description: 'Estimated protein in grams',
            },
            carbs: {
              type: Type.NUMBER,
              description: 'Estimated carbohydrates in grams',
            },
            fats: {
              type: Type.NUMBER,
              description: 'Estimated fat in grams',
            },
            fiber: {
              type: Type.NUMBER,
              description: 'Estimated dietary fiber in grams',
            },
            detectedItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  portion: { type: Type.STRING },
                  calories: { type: Type.INTEGER },
                },
                required: ['name', 'portion', 'calories'],
              },
            },
            healthAssessment: {
              type: Type.STRING,
              description: 'Short dietary insight or satiety analysis',
            },
          },
          required: ['isFoodDetected', 'foodName', 'calories', 'protein', 'carbs', 'fats'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Food Image Analysis API Error:', error);
    const errorMessage = String(error?.message || '');
    const is503 =
      error?.status === 503 ||
      error?.code === 503 ||
      errorMessage.includes('503') ||
      errorMessage.toUpperCase().includes('UNAVAILABLE') ||
      errorMessage.toLowerCase().includes('overloaded');

    if (is503) {
      return res.status(503).json({
        error: error?.message || 'AI vision model service is temporarily unavailable (HTTP 503).',
        code: 503,
        isUnavailable: true,
      });
    }

    return res.status(500).json({
      error: error?.message || 'An error occurred during food image analysis.',
    });
  }
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NutriTrack server running on port ${PORT}`);
  });
}

startServer();
