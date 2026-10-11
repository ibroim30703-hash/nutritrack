import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Plus,
  UtensilsCrossed,
  FlipHorizontal,
  Flame,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Lock,
  X,
  RotateCcw,
} from 'lucide-react';
import { LoggedFood, AppSettings } from '../types/nutrition';
import { TRANSLATIONS } from '../utils/translations';

interface FoodAnalysisResult {
  isFoodDetected: boolean;
  noFoodMessage?: string;
  foodName: string;
  estimatedPortion?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  detectedItems?: {
    name: string;
    portion: string;
    calories: number;
  }[];
  healthAssessment?: string;
}

interface AiCameraViewProps {
  onLogFood: (food: LoggedFood) => void;
  settings: AppSettings;
  onNavigateTab: (tab: string) => void;
}

type PermissionStatusType = 'prompt' | 'granted' | 'denied' | 'unsupported';

interface RetryState {
  isActive: boolean;
  currentAttempt: number;
  maxAttempts: number;
  countdownSeconds: number;
  is503: boolean;
  isExhausted: boolean;
  originalError?: string;
}

export const AiCameraView: React.FC<AiCameraViewProps> = ({
  onLogFood,
  settings,
  onNavigateTab,
}) => {
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  // Permission states
  const [permissionState, setPermissionState] = useState<PermissionStatusType>('prompt');
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [hasGrantedInSession, setHasGrantedInSession] = useState(false);

  // Camera stream states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Capture & Analysis states
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Localized 503 Retry Wrapper State
  const [retryState, setRetryState] = useState<RetryState>({
    isActive: false,
    currentAttempt: 0,
    maxAttempts: 3,
    countdownSeconds: 0,
    is503: false,
    isExhausted: false,
  });

  // Log action states
  const [selectedMealSlot, setSelectedMealSlot] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snack'
  >('lunch');
  const [isLoggedSuccess, setIsLoggedSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tracking refs for retry loops and cancellation
  const retryCountdownIntervalRef = useRef<any>(null);
  const currentImageRef = useRef<string | null>(null);
  const simulate503AttemptsRemainingRef = useRef<number>(0);

  // Check browser permission status if supported
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'camera' as PermissionName })
        .then((status) => {
          setPermissionState(status.state as PermissionStatusType);
          if (status.state === 'granted') {
            setHasGrantedInSession(true);
          }
          status.onchange = () => {
            setPermissionState(status.state as PermissionStatusType);
            if (status.state === 'granted') {
              setHasGrantedInSession(true);
            }
          };
        })
        .catch(() => {
          // Some browsers or iFrames don't support permissions.query for camera
        });
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState('unsupported');
    }

    return () => {
      stopCamera();
      if (retryCountdownIntervalRef.current) {
        clearInterval(retryCountdownIntervalRef.current);
      }
    };
  }, []);

  // User initiates camera activation: ask for permission first if not granted
  const handleInitiateCamera = () => {
    setCameraError(null);
    if (!hasGrantedInSession && permissionState !== 'granted') {
      setIsPermissionModalOpen(true);
    } else {
      startCamera();
    }
  };

  // User confirms permission in the dialog
  const handleConfirmPermissionAndStart = async () => {
    setIsPermissionModalOpen(false);
    await startCamera();
  };

  // Start Camera Stream
  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    stopCamera();
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        'Camera API is not supported in this browser or environment. You can upload a photo from your gallery below.'
      );
      setPermissionState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsCameraActive(true);
      setPermissionState('granted');
      setHasGrantedInSession(true);
      setCameraError(null);
    } catch (err: any) {
      console.warn('Camera access request error:', err);
      setIsCameraActive(false);

      if (
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError' ||
        err.name === 'SecurityError'
      ) {
        setPermissionState('denied');
        setCameraError(
          'Camera access was denied. Please allow camera permissions in your browser address bar, or upload a photo from your gallery.'
        );
      } else if (
        err.name === 'NotFoundError' ||
        err.name === 'DevicesNotFoundError'
      ) {
        setCameraError(
          'No camera device found on this system. You can still scan meals by uploading a photo.'
        );
      } else if (
        err.name === 'NotReadableError' ||
        err.name === 'TrackStartError'
      ) {
        setCameraError(
          'The camera is currently in use by another application or tab. Please close other camera apps and retry.'
        );
      } else {
        setCameraError(
          err.message ||
            'Unable to access camera. Please verify camera permissions or upload an image.'
        );
      }
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Switch Camera Front/Back
  const handleFlipCamera = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  // Snap photo from live video
  const handleCaptureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();
    setCapturedImage(dataUrl);
    analyzeImageWithRetry(dataUrl, 1);
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        stopCamera();
        setCapturedImage(result);
        analyzeImageWithRetry(result, 1);
      }
    };
    reader.readAsDataURL(file);
  };

  // Clear any running retry timers
  const clearRetryTimer = () => {
    if (retryCountdownIntervalRef.current) {
      clearInterval(retryCountdownIntervalRef.current);
      retryCountdownIntervalRef.current = null;
    }
  };

  /**
   * LOCALIZED RETRY WRAPPER for AI Camera Calorie Estimation
   * Handles Code 503 Service Unavailable with exponential backoff & localized UI updates
   */
  const analyzeImageWithRetry = useCallback(
    async (base64Data: string, attemptNumber: number = 1) => {
      clearRetryTimer();
      currentImageRef.current = base64Data;
      setIsAnalyzing(true);
      setAnalysisResult(null);
      setAnalysisError(null);
      setIsLoggedSuccess(false);

      const MAX_RETRIES = 3;
      // Exponential backoff delays in seconds for 503 retries: [2s, 3.5s, 5s]
      const backoffDelays = [2, 3, 5];

      // Check if simulation is active
      const shouldSimulate503 = simulate503AttemptsRemainingRef.current > 0;
      if (shouldSimulate503) {
        simulate503AttemptsRemainingRef.current -= 1;
      }

      try {
        const response = await fetch('/api/analyze-food-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType: 'image/jpeg',
            simulate503: shouldSimulate503,
          }),
        });

        const data = await response.json().catch(() => ({}));

        // Detect 503 Unavailable either from HTTP status or payload
        const is503 =
          response.status === 503 ||
          data?.code === 503 ||
          String(data?.error || '').includes('503') ||
          String(data?.error || '').toUpperCase().includes('UNAVAILABLE') ||
          String(data?.error || '').toLowerCase().includes('overloaded');

        if (is503) {
          console.warn(`[NutriTrack AI Camera] 503 Service Unavailable encountered on attempt ${attemptNumber}/${MAX_RETRIES}`);

          if (attemptNumber < MAX_RETRIES) {
            // Schedule next localized retry with exponential countdown
            const delaySec = backoffDelays[attemptNumber - 1] || 3;

            setRetryState({
              isActive: true,
              currentAttempt: attemptNumber,
              maxAttempts: MAX_RETRIES,
              countdownSeconds: delaySec,
              is503: true,
              isExhausted: false,
              originalError: data?.error || 'AI vision service unavailable (503)',
            });

            let remaining = delaySec;
            retryCountdownIntervalRef.current = setInterval(() => {
              remaining -= 1;
              if (remaining <= 0) {
                clearRetryTimer();
                analyzeImageWithRetry(base64Data, attemptNumber + 1);
              } else {
                setRetryState((prev) => ({
                  ...prev,
                  countdownSeconds: remaining,
                }));
              }
            }, 1000);
            return;
          } else {
            // All retry attempts exhausted
            setRetryState({
              isActive: false,
              currentAttempt: attemptNumber,
              maxAttempts: MAX_RETRIES,
              countdownSeconds: 0,
              is503: true,
              isExhausted: true,
              originalError: data?.error,
            });
            setAnalysisError(t.retriesExhausted);
            return;
          }
        }

        if (!response.ok) {
          throw new Error(data.error || 'Failed to analyze food photo.');
        }

        // Successfully analyzed: clear retry state
        setRetryState({
          isActive: false,
          currentAttempt: 0,
          maxAttempts: MAX_RETRIES,
          countdownSeconds: 0,
          is503: false,
          isExhausted: false,
        });
        setAnalysisResult(data);
      } catch (err: any) {
        console.error('Analysis error:', err);
        const errMsg = String(err?.message || '');
        const is503 =
          errMsg.includes('503') ||
          errMsg.toUpperCase().includes('UNAVAILABLE');

        if (is503 && attemptNumber < MAX_RETRIES) {
          const delaySec = backoffDelays[attemptNumber - 1] || 3;
          setRetryState({
            isActive: true,
            currentAttempt: attemptNumber,
            maxAttempts: MAX_RETRIES,
            countdownSeconds: delaySec,
            is503: true,
            isExhausted: false,
            originalError: errMsg,
          });

          let remaining = delaySec;
          retryCountdownIntervalRef.current = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
              clearRetryTimer();
              analyzeImageWithRetry(base64Data, attemptNumber + 1);
            } else {
              setRetryState((prev) => ({
                ...prev,
                countdownSeconds: remaining,
              }));
            }
          }, 1000);
          return;
        }

        setRetryState({
          isActive: false,
          currentAttempt: 0,
          maxAttempts: MAX_RETRIES,
          countdownSeconds: 0,
          is503: false,
          isExhausted: false,
        });
        setAnalysisError(err.message || 'Error occurred while contacting vision server.');
      } finally {
        setIsAnalyzing(false);
      }
    },
    [t]
  );

  // Manual immediate retry (bypasses countdown delay)
  const handleImmediateManualRetry = () => {
    clearRetryTimer();
    if (currentImageRef.current) {
      analyzeImageWithRetry(currentImageRef.current, retryState.currentAttempt + 1);
    }
  };

  // Cancel retry
  const handleCancelRetry = () => {
    clearRetryTimer();
    setRetryState({
      isActive: false,
      currentAttempt: 0,
      maxAttempts: 3,
      countdownSeconds: 0,
      is503: false,
      isExhausted: false,
    });
    setIsAnalyzing(false);
  };

  // Sample Photos Testing Helper
  const handleSampleTest = (sampleUrl: string) => {
    stopCamera();
    clearRetryTimer();
    simulate503AttemptsRemainingRef.current = 0;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        analyzeImageWithRetry(dataUrl, 1);
      }
    };
    img.src = sampleUrl;
  };

  // 503 Unavailable Simulator: Simulates 503 for 2 attempts, then succeeds on attempt 3
  const handleSimulate503Test = () => {
    stopCamera();
    clearRetryTimer();
    // Simulate 2 consecutive 503 failures, so attempt 3 succeeds automatically!
    simulate503AttemptsRemainingRef.current = 2;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        analyzeImageWithRetry(dataUrl, 1);
      }
    };
    img.src = '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg';
  };

  // Non-Food test helper (draws a laptop sketch onto canvas to test the no-food message requirement)
  const handleNonFoodTest = () => {
    stopCamera();
    clearRetryTimer();
    simulate503AttemptsRemainingRef.current = 0;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#262626';
      ctx.fillRect(0, 0, 600, 400);

      // Laptop screen
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, 60, 300, 200);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 60, 300, 200);

      // Keyboard base
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(110, 260);
      ctx.lineTo(490, 260);
      ctx.lineTo(520, 320);
      ctx.lineTo(80, 320);
      ctx.closePath();
      ctx.fill();

      // Pen & notepad
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(40, 280, 70, 90);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      analyzeImageWithRetry(dataUrl, 1);
    }
  };

  // Log food to diary
  const handleLogAnalyzedFood = () => {
    if (!analysisResult || !analysisResult.isFoodDetected) return;

    const newFood: LoggedFood = {
      id: `camera_log_${Date.now()}`,
      foodName: analysisResult.foodName,
      mealSlot: selectedMealSlot,
      servings: 1,
      servingDescription: analysisResult.estimatedPortion || '1 AI estimated portion',
      calories: analysisResult.calories,
      protein: Math.round(analysisResult.protein * 10) / 10,
      carbs: Math.round(analysisResult.carbs * 10) / 10,
      fats: Math.round(analysisResult.fats * 10) / 10,
      fiber: analysisResult.fiber ? Math.round(analysisResult.fiber * 10) / 10 : 0,
      timeLogged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onLogFood(newFood);
    setIsLoggedSuccess(true);
    setTimeout(() => {
      onNavigateTab('tracker');
    }, 1200);
  };

  // Reset to take another photo
  const handleReset = () => {
    clearRetryTimer();
    setCapturedImage(null);
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsLoggedSuccess(false);
    setRetryState({
      isActive: false,
      currentAttempt: 0,
      maxAttempts: 3,
      countdownSeconds: 0,
      is503: false,
      isExhausted: false,
    });
    handleInitiateCamera();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              AI Food Camera & Calorie Scanner
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Gemini Vision
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Snap or upload a photo of your meal to calculate its calories, macronutrients, and portion sizes instantly.
          </p>

          {/* Camera Permission Status & 503 Auto-Retry Badge */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {isCameraActive ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Camera Active</span>
              </span>
            ) : permissionState === 'granted' ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Camera Access Granted</span>
              </span>
            ) : permissionState === 'denied' ? (
              <button
                onClick={() => setIsPermissionModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/80 hover:bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Camera Access Blocked (Click to re-request)</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Camera Permission Required Upon Activation</span>
              </span>
            )}

            {/* 503 Localized Retry Wrapper Badge */}
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
              <RefreshCw className="w-3 h-3 text-emerald-600" />
              <span>503 Resilient Wrapper Active</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCameraActive && !capturedImage && (
            <button
              onClick={handleInitiateCamera}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Start Camera</span>
            </button>
          )}

          {isCameraActive && (
            <button
              onClick={stopCamera}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <span>Stop Camera</span>
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Camera Permission Denied / Error Alert */}
      {cameraError && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-xs text-amber-900 dark:text-amber-200 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-sm text-amber-950 dark:text-amber-100">
                Camera Access Needed
              </div>
              <p className="leading-relaxed">{cameraError}</p>
            </div>
          </div>

          <div className="p-3 bg-white/80 dark:bg-neutral-900/80 rounded-lg border border-amber-200/80 dark:border-amber-800 text-[11px] text-neutral-700 dark:text-neutral-300 space-y-1">
            <span className="font-semibold block text-neutral-900 dark:text-neutral-100">
              How to enable camera access in your browser:
            </span>
            <ol className="list-decimal pl-4 space-y-0.5 text-neutral-600 dark:text-neutral-400">
              <li>Tap the lock / site settings icon in your browser address bar.</li>
              <li>Toggle <strong>Camera</strong> to <strong>Allow</strong>.</li>
              <li>Click <strong>Request Permission Again</strong> below or refresh the page.</li>
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setIsPermissionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Request Permission Again</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo Instead</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Viewfinder / Canvas Area */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
        {/* Hidden Canvas for Frame Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* State 1: Live Video Camera Stream */}
        {isCameraActive && !capturedImage && (
          <div className="relative aspect-4/3 sm:aspect-16/9 w-full bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Target Reticle Overlay */}
            <div className="absolute inset-8 sm:inset-16 border-2 border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                  ALIGN MEAL IN FRAME
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-center text-white/80 text-xs font-medium bg-black/40 py-1 rounded backdrop-blur-xs">
                Hold steady for optimal calorie calculation
              </div>
            </div>

            {/* Camera Floating Controls */}
            <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-6 z-20">
              <button
                onClick={handleFlipCamera}
                className="w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                title="Flip Camera"
              >
                <FlipHorizontal className="w-5 h-5" />
              </button>

              {/* Shutter Capture Button */}
              <button
                onClick={handleCaptureSnapshot}
                className="w-16 h-16 rounded-full bg-white p-1 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Take Picture"
              >
                <div className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 border-2 border-white flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>

              <button
                onClick={stopCamera}
                className="w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-xs transition-colors text-xs font-medium cursor-pointer"
                title="Cancel Camera"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* State 2: Captured/Uploaded Photo & Analysis View */}
        {capturedImage && (
          <div className="relative aspect-4/3 sm:aspect-16/9 w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured Meal"
              className="w-full h-full object-contain"
            />

            {/* Normal Scanning Laser Line when analyzing */}
            {isAnalyzing && !retryState.isActive && (
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex flex-col justify-center items-center">
                <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#10B981] animate-pulse" />
                <div className="mt-4 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-500/50 text-white text-xs font-semibold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>AI Vision analyzing ingredients, portions & calories...</span>
                </div>
              </div>
            )}

            {/* LOCALIZED 503 RETRY WRAPPER OVERLAY */}
            {retryState.isActive && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-30 animate-in fade-in duration-200">
                <div className="max-w-md w-full bg-neutral-900/95 border border-amber-500/60 rounded-2xl p-6 shadow-2xl text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>HTTP 503 Unavailable</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-white">
                      {t.serviceUnavailableTitle}
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {t.serviceUnavailableDesc}
                    </p>
                  </div>

                  {/* Countdown Status with current attempt indicator */}
                  <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                      <span>
                        {t.retryingAttempt
                          .replace('{current}', String(retryState.currentAttempt))
                          .replace('{max}', String(retryState.maxAttempts))
                          .replace('{seconds}', String(retryState.countdownSeconds))}
                      </span>
                      <span className="font-mono text-sm font-bold bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">
                        {retryState.countdownSeconds}s
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(
                            10,
                            ((3 - retryState.countdownSeconds) / 3) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions: Immediate Retry or Cancel */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <button
                      onClick={handleImmediateManualRetry}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.retryNowButton}</span>
                    </button>

                    <button
                      onClick={handleCancelRetry}
                      className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white border border-white/10">
                Photo Captured
              </span>
            </div>

            {/* Retake Floating Button */}
            {!isAnalyzing && !retryState.isActive && (
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Another Photo</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* State 3: Standby Screen (Camera not started and no photo yet) */}
        {!isCameraActive && !capturedImage && (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <Camera className="w-8 h-8" />
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Ready to Scan Meal Calories
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                Take a live snapshot with your device's camera or select an image from your photos.
                Camera permission is verified and 503 localized auto-retry is active.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleInitiateCamera}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Open Device Camera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload From Gallery</span>
              </button>
            </div>

            {/* Quick Test Samples with 503 Simulator */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 w-full max-w-xl">
              <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                Quick Test Samples & Retry Verification:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <button
                  onClick={() => handleSampleTest('/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  🥗 Salmon Bowl (Food)
                </button>
                <button
                  onClick={() => handleSampleTest('/src/assets/images/grilled_sirloin_steak_1791387288438.jpg')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  🥩 Sirloin Steak (Food)
                </button>
                <button
                  onClick={() => handleSampleTest('/src/assets/images/nutrition_greek_salad_1791285451456.jpg')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  🥙 Greek Salad (Food)
                </button>
                <button
                  onClick={handleNonFoodTest}
                  className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                  title="Tests: In case there is no food identified in the photo write a message"
                >
                  💻 Laptop (Non-Food Test)
                </button>
                {/* 503 Unavailable Simulator Button */}
                <button
                  onClick={handleSimulate503Test}
                  className="px-3 py-1.5 rounded-lg border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors font-semibold cursor-pointer"
                  title="Simulates 503 service unavailable to verify localized retry wrapper and recovery"
                >
                  {t.simulate503Test}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 503 EXHAUSTED ALERT (When all 3 localized retry attempts fail) */}
      {retryState.isExhausted && (
        <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-amber-950 dark:text-amber-100">
                  {t.serviceUnavailableTitle}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold">
                  Code 503
                </span>
              </div>
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                {t.retriesExhausted}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-amber-200 dark:border-amber-800/80">
            <button
              onClick={() => {
                if (currentImageRef.current) {
                  analyzeImageWithRetry(currentImageRef.current, 1);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.retryNowButton}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
            >
              <span>Upload Different Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* General Non-503 Analysis Error */}
      {analysisError && !retryState.isExhausted && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Analysis Failed</div>
            <div>{analysisError}</div>
          </div>
        </div>
      )}

      {/* CASE 1: NO FOOD IDENTIFIED IN PHOTO (User Explicit Requirement) */}
      {analysisResult && !analysisResult.isFoodDetected && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-amber-950 dark:text-amber-100">
                No Food Identified in Photo
              </h3>
              <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                {analysisResult.noFoodMessage ||
                  'No food identified in the photo. Please capture a clear picture of a meal, snack, or beverage to estimate its calories.'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-amber-200/60 dark:border-amber-800/60 text-xs text-neutral-700 dark:text-neutral-300 space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
              Tips for Best Scanning Accuracy:
            </span>
            <ul className="list-disc pl-4 space-y-0.5 text-neutral-600 dark:text-neutral-400">
              <li>Position your plate or beverage in the center of the viewfinder.</li>
              <li>Ensure proper lighting without heavy reflections or shadows.</li>
              <li>Avoid photos of non-food objects, empty packaging, or distant backgrounds.</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* CASE 2: FOOD IDENTIFIED & NUTRITIONAL BREAKDOWN */}
      {analysisResult && analysisResult.isFoodDetected && (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-6">
          {/* Dish Header & Calories Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Meal Recognized
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {analysisResult.estimatedPortion}
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                {analysisResult.foodName}
              </h3>
            </div>

            <div className="flex items-baseline gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-xl self-start sm:self-auto">
              <Flame className="w-5 h-5 text-emerald-600 shrink-0 self-center" />
              <span className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono tabular-nums">
                {analysisResult.calories}
              </span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">kcal</span>
            </div>
          </div>

          {/* Macronutrients 4-Col Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Protein</span>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                {analysisResult.protein}g
              </span>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Carbs</span>
              <span className="text-lg font-bold text-amber-700 dark:text-amber-400 font-mono tabular-nums">
                {analysisResult.carbs}g
              </span>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Fats</span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-400 font-mono tabular-nums">
                {analysisResult.fats}g
              </span>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Fiber</span>
              <span className="text-lg font-bold text-teal-700 dark:text-teal-400 font-mono tabular-nums">
                {analysisResult.fiber || 0}g
              </span>
            </div>
          </div>

          {/* Identified Ingredient Components List */}
          {analysisResult.detectedItems && analysisResult.detectedItems.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Component Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {analysisResult.detectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">{item.name}</div>
                      <div className="text-[11px] text-neutral-400">{item.portion}</div>
                    </div>
                    <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nutritionist Insight */}
          {analysisResult.healthAssessment && (
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">AI Dietitian Note: </span>
                {analysisResult.healthAssessment}
              </div>
            </div>
          )}

          {/* Action Row: Meal Slot Selection & Add to Diary Button */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Log As:</span>
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedMealSlot(slot)}
                  className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all cursor-pointer ${
                    selectedMealSlot === slot
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs font-bold'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                Scan Another
              </button>

              <button
                onClick={handleLogAnalyzedFood}
                disabled={isLoggedSuccess}
                className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer ${
                  isLoggedSuccess
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isLoggedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Logged to Diary!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {analysisResult.calories} kcal to Diary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLICIT CAMERA ACCESS PERMISSION REQUEST MODAL */}
      {isPermissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Camera Access Permission
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Required for AI Meal Vision scanner
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPermissionModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation Body */}
            <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <p>
                NutriTrack would like to access your device’s camera to capture meal images and calculate calories and macronutrients using Gemini Vision AI.
              </p>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Real-time scanning:</strong> Frame analysis occurs only when you tap the shutter button.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Privacy protected:</strong> Live video remains local on your device until a photo is captured for analysis.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Revocable anytime:</strong> You can turn off the camera or change permissions in your browser settings at any point.</span>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={handleConfirmPermissionAndStart}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Allow & Open Camera</span>
              </button>

              <button
                onClick={() => {
                  setIsPermissionModalOpen(false);
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo Instead</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
