import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
  getDocFromServer,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, LoggedFood, MealProposal, MealRecipe } from '../types/nutrition';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error Handling Specification from skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connectivity test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify network and configuration.');
    }
  }
}
testConnection();

// Authentication Helper Functions
export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out Error:', error);
    throw error;
  }
}

// User Profile Sync
export async function saveUserProfileToFirestore(
  userId: string,
  profile: UserProfile,
  currentUser: User
): Promise<void> {
  const path = `users/${userId}`;
  try {
    await setDoc(doc(db, 'users', userId), {
      userId,
      email: currentUser.email || '',
      displayName: currentUser.displayName || '',
      photoURL: currentUser.photoURL || '',
      age: profile.age,
      gender: profile.gender,
      heightCm: profile.heightCm,
      weightKg: profile.weightKg,
      targetWeightKg: profile.targetWeightKg,
      unitSystem: profile.unitSystem,
      activityLevel: profile.activityLevel,
      fitnessGoal: profile.fitnessGoal,
      dietPreference: profile.dietPreference,
      waterGoalMl: profile.waterGoalMl,
      language: profile.settings?.language || 'en',
      theme: profile.settings?.theme || 'light',
      background: profile.settings?.background || 'clean',
      fontStyle: profile.settings?.fontStyle || 'sans',
      avatarEmoji: profile.settings?.avatarEmoji || '🥗',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function loadUserProfileFromFirestore(
  userId: string
): Promise<UserProfile | null> {
  const path = `users/${userId}`;
  try {
    const snapshot = await getDoc(doc(db, 'users', userId));
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        age: data.age,
        gender: data.gender,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        targetWeightKg: data.targetWeightKg,
        unitSystem: data.unitSystem || 'metric',
        activityLevel: data.activityLevel,
        fitnessGoal: data.fitnessGoal,
        dietPreference: data.dietPreference,
        waterGoalMl: data.waterGoalMl || 2500,
        settings: {
          language: data.language || 'en',
          theme: data.theme || 'light',
          background: data.background || 'clean',
          fontStyle: data.fontStyle || 'sans',
          fontSize: 'normal',
          avatarEmoji: data.avatarEmoji || '🥗',
        },
      };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Food Diary Sync
export async function saveFoodLogToFirestore(
  userId: string,
  food: LoggedFood
): Promise<void> {
  const path = `users/${userId}/foodLogs/${food.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'foodLogs', food.id), {
      id: food.id,
      userId,
      foodName: food.foodName,
      mealSlot: food.mealSlot,
      servings: food.servings,
      servingDescription: food.servingDescription,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats,
      fiber: food.fiber || 0,
      timeLogged: food.timeLogged,
      date: new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteFoodLogFromFirestore(
  userId: string,
  foodId: string
): Promise<void> {
  const path = `users/${userId}/foodLogs/${foodId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'foodLogs', foodId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeFoodLogs(
  userId: string,
  callback: (foods: LoggedFood[]) => void
): () => void {
  const path = `users/${userId}/foodLogs`;
  const q = query(collection(db, 'users', userId, 'foodLogs'));

  return onSnapshot(
    q,
    (snapshot) => {
      const foods: LoggedFood[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        foods.push({
          id: d.id,
          foodName: d.foodName,
          mealSlot: d.mealSlot,
          servings: d.servings,
          servingDescription: d.servingDescription,
          calories: d.calories,
          protein: d.protein,
          carbs: d.carbs,
          fats: d.fats,
          fiber: d.fiber,
          timeLogged: d.timeLogged,
        });
      });
      callback(foods);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// Chatbot History Sync
export interface ChatMessageItem {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  proposal?: MealProposal;
  status?: 'sent' | 'delivered' | 'read';
}

export async function saveChatMessageToFirestore(
  userId: string,
  message: ChatMessageItem
): Promise<void> {
  const path = `users/${userId}/chatHistory/${message.id}`;
  try {
    const docData: any = {
      id: message.id,
      userId,
      role: message.role,
      text: message.text,
      timestamp: message.timestamp,
    };
    if (message.proposal) {
      docData.proposal = message.proposal;
    }
    if (message.status) {
      docData.status = message.status;
    }
    await setDoc(doc(db, 'users', userId, 'chatHistory', message.id), docData);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeChatHistory(
  userId: string,
  callback: (messages: ChatMessageItem[]) => void
): () => void {
  const path = `users/${userId}/chatHistory`;
  const q = query(
    collection(db, 'users', userId, 'chatHistory'),
    orderBy('timestamp', 'asc'),
    limit(50)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ChatMessageItem[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        messages.push({
          id: d.id,
          role: d.role,
          text: d.text,
          timestamp: d.timestamp,
          proposal: d.proposal || undefined,
          status: d.status || undefined,
        });
      });
      callback(messages);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// ==========================================
// Community Recipes (Global Database)
// ==========================================
export async function saveCommunityRecipeToFirestore(
  recipe: MealRecipe,
  currentUser: User
): Promise<void> {
  const path = `communityRecipes/${recipe.id}`;
  try {
    const docData: any = {
      id: recipe.id,
      authorId: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Community Chef',
      title: recipe.title,
      category: recipe.category,
      cuisine: recipe.cuisine || 'International',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
      fiber: recipe.fiber || 0,
      prepTimeMinutes: recipe.prepTimeMinutes || 20,
      difficulty: recipe.difficulty || 'Easy',
      dietTags: recipe.dietTags || ['Community Recipe'],
      image: recipe.image || '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg',
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      chefTip: recipe.chefTip || 'Contributed by our community nutritionist.',
      createdAt: recipe.createdAt || Date.now(),
      visibility: 'community',
      isUserCustom: true,
    };
    if (recipe.micronutrients) {
      docData.micronutrients = recipe.micronutrients;
    }
    await setDoc(doc(db, 'communityRecipes', recipe.id), docData);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCommunityRecipeFromFirestore(recipeId: string): Promise<void> {
  const path = `communityRecipes/${recipeId}`;
  try {
    await deleteDoc(doc(db, 'communityRecipes', recipeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeCommunityRecipes(
  callback: (recipes: MealRecipe[]) => void
): () => void {
  const path = 'communityRecipes';
  const q = query(collection(db, 'communityRecipes'), orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(
    q,
    (snapshot) => {
      const recipes: MealRecipe[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        recipes.push({
          id: d.id,
          title: d.title,
          category: d.category,
          cuisine: d.cuisine,
          calories: d.calories,
          protein: d.protein,
          carbs: d.carbs,
          fats: d.fats,
          fiber: d.fiber,
          prepTimeMinutes: d.prepTimeMinutes,
          difficulty: d.difficulty,
          dietTags: d.dietTags || ['Community'],
          image: d.image || '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg',
          ingredients: d.ingredients || [],
          instructions: d.instructions || [],
          chefTip: d.chefTip || '',
          authorId: d.authorId,
          authorName: d.authorName,
          createdAt: d.createdAt,
          visibility: 'community',
          isUserCustom: true,
          micronutrients: d.micronutrients || undefined,
        });
      });
      callback(recipes);
    },
    (error) => {
      // Don't crash UI if collection is fresh or empty
      console.warn('Community recipes snapshot notice:', error);
    }
  );
}

// ==========================================
// User Private Custom Recipes
// ==========================================
export async function saveUserPrivateRecipeToFirestore(
  userId: string,
  recipe: MealRecipe
): Promise<void> {
  const path = `users/${userId}/customRecipes/${recipe.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'customRecipes', recipe.id), {
      ...recipe,
      authorId: userId,
      visibility: 'private',
      isUserCustom: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteUserPrivateRecipeFromFirestore(
  userId: string,
  recipeId: string
): Promise<void> {
  const path = `users/${userId}/customRecipes/${recipeId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'customRecipes', recipeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeUserPrivateRecipes(
  userId: string,
  callback: (recipes: MealRecipe[]) => void
): () => void {
  const path = `users/${userId}/customRecipes`;
  const q = query(collection(db, 'users', userId, 'customRecipes'));

  return onSnapshot(
    q,
    (snapshot) => {
      const recipes: MealRecipe[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data() as MealRecipe;
        recipes.push(d);
      });
      callback(recipes);
    },
    (error) => {
      console.warn('Private recipes snapshot notice:', error);
    }
  );
}

