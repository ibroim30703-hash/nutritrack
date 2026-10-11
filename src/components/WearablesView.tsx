import React, { useState } from 'react';
import {
  Watch,
  Heart,
  Flame,
  Activity,
  RefreshCw,
  Bluetooth,
  CheckCircle2,
  AlertCircle,
  Zap,
  Footprints,
  Plus,
} from 'lucide-react';
import { WearableDeviceState, UserProfile } from '../types/nutrition';
import { BluetoothWearableService } from '../utils/bluetoothWearable';

interface WearablesViewProps {
  wearableState: WearableDeviceState;
  onUpdateWearableState: (newState: Partial<WearableDeviceState>) => void;
  profile: UserProfile;
}

export const WearablesView: React.FC<WearablesViewProps> = ({
  wearableState,
  onUpdateWearableState,
  profile,
}) => {
  const [bluetoothService] = useState(() => new BluetoothWearableService());
  const [isBluetoothConnecting, setIsBluetoothConnecting] = useState(false);
  const [bluetoothError, setBluetoothError] = useState<string | null>(null);

  // Workout simulator modal
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [workoutType, setWorkoutType] = useState('running');
  const [workoutDurationMins, setWorkoutDurationMins] = useState(30);

  // Real Web Bluetooth Connection Handler
  const handleConnectBluetooth = async () => {
    setIsBluetoothConnecting(true);
    setBluetoothError(null);

    try {
      const deviceName = await bluetoothService.connectHeartRateSensor(
        (data) => {
          onUpdateWearableState({
            liveHeartRateBpm: data.heartRate,
            lastSyncTime: 'Just now (live BLE)',
          });
        },
        () => {
          onUpdateWearableState({
            isConnected: false,
            deviceName: 'Disconnected Sensor',
          });
        }
      );

      onUpdateWearableState({
        isConnected: true,
        deviceName,
        connectionType: 'bluetooth_ble',
        lastSyncTime: 'Live BLE Stream active',
      });
    } catch (err: any) {
      setBluetoothError(
        err.message ||
          'Could not pair Bluetooth sensor. Ensure your watch/chest strap has BLE Heart Rate broadcast enabled, or use the Wearable Device Simulator below.'
      );
    } finally {
      setIsBluetoothConnecting(false);
    }
  };

  const handleDisconnectBluetooth = () => {
    bluetoothService.disconnect();
    onUpdateWearableState({
      isConnected: false,
      deviceName: 'No device paired',
    });
  };

  // Sync simulation
  const handleManualSync = () => {
    onUpdateWearableState({ isSyncing: true });
    setTimeout(() => {
      // Simulate slight step & burn bump
      const additionalSteps = Math.floor(Math.random() * 450) + 120;
      const additionalBurn = Math.floor(additionalSteps * 0.04);
      onUpdateWearableState({
        stepsToday: wearableState.stepsToday + additionalSteps,
        activeCaloriesBurned: wearableState.activeCaloriesBurned + additionalBurn,
        distanceKm: Math.round((wearableState.distanceKm + additionalSteps * 0.00075) * 10) / 10,
        lastSyncTime: 'Just now',
        isSyncing: false,
      });
    }, 800);
  };

  // Switch wearable platform preset
  const handleSelectPlatform = (
    platform: 'apple_health' | 'garmin' | 'fitbit' | 'whoop' | 'simulated',
    name: string
  ) => {
    onUpdateWearableState({
      isConnected: true,
      connectionType: platform,
      deviceName: name,
      lastSyncTime: 'Just now',
    });
  };

  // Workout Logger
  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    // MET calculation: Calories = MET * weight(kg) * duration(hours)
    const metValues: Record<string, number> = {
      running: 9.8,
      cycling: 7.5,
      hiit: 8.5,
      strength: 5.0,
      swimming: 7.0,
      walking: 3.8,
    };
    const met = metValues[workoutType] || 6.0;
    const hours = workoutDurationMins / 60;
    const burned = Math.round(met * profile.weightKg * hours);
    const addedSteps = workoutType === 'cycling' || workoutType === 'swimming' ? 200 : Math.round(workoutDurationMins * 125);

    onUpdateWearableState({
      activeCaloriesBurned: wearableState.activeCaloriesBurned + burned,
      activeMinutes: wearableState.activeMinutes + workoutDurationMins,
      stepsToday: wearableState.stepsToday + addedSteps,
      lastSyncTime: `Workout added (${workoutDurationMins}m)`,
    });

    setIsWorkoutModalOpen(false);
  };

  const stepPercent = Math.min(100, Math.round((wearableState.stepsToday / wearableState.stepGoal) * 100));

  return (
    <div className="space-y-6">
      {/* Wearable Device Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <Watch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-neutral-900">
                  {wearableState.isConnected ? wearableState.deviceName : 'Wearables Activity Hub'}
                </h2>
                {wearableState.isConnected ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Connected
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                    Standby
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Last synchronized: {wearableState.lastSyncTime} · Battery: {wearableState.batteryPercentage}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSync}
              disabled={wearableState.isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${wearableState.isSyncing ? 'animate-spin' : ''}`} />
              <span>{wearableState.isSyncing ? 'Syncing...' : 'Sync Activity'}</span>
            </button>

            <button
              onClick={() => setIsWorkoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Workout</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Heart Rate Tile */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Live Heart Rate</span>
              <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                {wearableState.liveHeartRateBpm}
              </span>
              <span className="text-xs text-neutral-500 ml-1.5">BPM</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums">
              Resting: {wearableState.restingHeartRateBpm} BPM
            </div>
          </div>

          {/* Daily Steps */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Daily Steps</span>
              <Footprints className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                {wearableState.stepsToday.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-500 ml-1.5">/ {wearableState.stepGoal.toLocaleString()}</span>
            </div>
            {/* Progress bar */}
            <div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${stepPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-neutral-400 mt-1 font-mono tabular-nums">
                {stepPercent}% of daily step goal
              </div>
            </div>
          </div>

          {/* Active Calories Burned */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-900">Active Calories Burned</span>
              <Flame className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold text-emerald-950 font-mono tabular-nums">
                {wearableState.activeCaloriesBurned}
              </span>
              <span className="text-xs text-emerald-800 ml-1.5">kcal</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              Expands daily diet budget by +{wearableState.activeCaloriesBurned} kcal
            </div>
          </div>

          {/* Active Minutes & Distance */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Movement & Distance</span>
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                {wearableState.activeMinutes}
              </span>
              <span className="text-xs text-neutral-500 ml-1.5">active mins</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums">
              Estimated Distance: {wearableState.distanceKm} km
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Connection & Preset Bridges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Direct Web Bluetooth BLE Hardware Pairing */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bluetooth className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-neutral-900">
                Web Bluetooth GATT Hardware Pairing
              </h3>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
              Standard 0x180D BLE
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Connect directly to Bluetooth Smart heart rate straps, armbands, or smartwatches
            (Polar H10/Verity, Garmin HRM-Pro, Wahoo TICKR, Whoop, Apple Watch with BLE broadcast).
          </p>

          {bluetoothError && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{bluetoothError}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            {wearableState.connectionType === 'bluetooth_ble' && wearableState.isConnected ? (
              <button
                onClick={handleDisconnectBluetooth}
                className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
              >
                Disconnect Bluetooth Sensor
              </button>
            ) : (
              <button
                onClick={handleConnectBluetooth}
                disabled={isBluetoothConnecting}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                <Bluetooth className="w-4 h-4" />
                <span>
                  {isBluetoothConnecting ? 'Searching for BLE Devices...' : 'Pair Bluetooth Sensor'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Wearable Platforms & Ecosystem Sync */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Watch className="w-5 h-5 text-neutral-700" />
              <h3 className="text-sm font-bold text-neutral-900">
                Connected Device Profile & Presets
              </h3>
            </div>
            <span className="text-[10px] text-neutral-400">Sync Bridge</span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Switch your active wearable profile to stream simulated telemetry or match your personal device:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'apple_health', name: 'Apple Watch Series 9' },
              { id: 'garmin', name: 'Garmin Forerunner 265' },
              { id: 'fitbit', name: 'Fitbit Charge 6' },
              { id: 'whoop', name: 'Whoop 4.0 Strap' },
            ].map((device) => {
              const isSelected = wearableState.deviceName === device.name;
              return (
                <button
                  key={device.id}
                  onClick={() =>
                    handleSelectPlatform(
                      device.id as any,
                      device.name
                    )
                  }
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span>{device.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Workout Logger Modal */}
      {isWorkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base font-bold text-neutral-900">
                Log Wearable Workout Session
              </h3>
              <p className="text-xs text-neutral-500">
                Calculates metabolic equivalent (MET) energy burn and syncs steps
              </p>
            </div>

            <form onSubmit={handleLogWorkout} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Activity Type
                </label>
                <select
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="running">Outdoor Running (9.8 METs)</option>
                  <option value="cycling">Road Cycling (7.5 METs)</option>
                  <option value="hiit">HIIT & Circuit Training (8.5 METs)</option>
                  <option value="strength">Resistance Strength Training (5.0 METs)</option>
                  <option value="swimming">Lap Swimming (7.0 METs)</option>
                  <option value="walking">Brisk Walking (3.8 METs)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="240"
                  value={workoutDurationMins}
                  onChange={(e) => setWorkoutDurationMins(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
                  required
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600">
                Estimated Burn for your weight ({profile.weightKg} kg):{' '}
                <span className="font-bold text-neutral-900 font-mono tabular-nums">
                  ~
                  {Math.round(
                    (workoutType === 'running'
                      ? 9.8
                      : workoutType === 'cycling'
                      ? 7.5
                      : workoutType === 'hiit'
                      ? 8.5
                      : 5.0) *
                      profile.weightKg *
                      (workoutDurationMins / 60)
                  )}{' '}
                  kcal
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWorkoutModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
