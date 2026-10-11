/**
 * Wearable Device Bridge & Web Bluetooth GATT integration.
 * Supports standard Bluetooth Heart Rate Service (0x180D) and characteristic (0x2A37).
 */

export interface BluetoothHeartRateData {
  heartRate: number;
  contactDetected?: boolean;
  energyExpendedJoules?: number;
}

export class BluetoothWearableService {
  private device: any | null = null;
  private server: any | null = null;
  private characteristic: any | null = null;

  public static isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  }

  /**
   * Request standard BLE Heart Rate device (GATT service 0x180D)
   */
  public async connectHeartRateSensor(
    onHeartRateChange: (data: BluetoothHeartRateData) => void,
    onDisconnected: () => void
  ): Promise<string> {
    if (!BluetoothWearableService.isSupported()) {
      throw new Error('Web Bluetooth is not supported in this browser environment.');
    }

    try {
      const nav = navigator as any;
      this.device = await nav.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service'],
      });

      this.device.addEventListener('gattserverdisconnected', () => {
        this.characteristic = null;
        this.server = null;
        onDisconnected();
      });

      this.server = await this.device.gatt.connect();
      const service = await this.server.getPrimaryService('heart_rate');
      this.characteristic = await service.getCharacteristic('heart_rate_measurement');

      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const value: DataView = event.target.value;
        const parsed = this.parseHeartRateMeasurement(value);
        onHeartRateChange(parsed);
      });

      return this.device.name || 'Bluetooth Heart Rate Monitor';
    } catch (err: any) {
      if (err.name === 'NotFoundError') {
        throw new Error('Device pairing was cancelled by user.');
      }
      throw err;
    }
  }

  public disconnect(): void {
    if (this.device && this.device.gatt.connected) {
      this.device.gatt.disconnect();
    }
    this.characteristic = null;
    this.server = null;
    this.device = null;
  }

  /**
   * Parses standard Bluetooth GATT Heart Rate Measurement payload (GATT Specification)
   */
  private parseHeartRateMeasurement(value: DataView): BluetoothHeartRateData {
    const flags = value.getUint8(0);
    const is16Bit = (flags & 0x01) !== 0;
    const contactDetected = (flags & 0x06) === 0x06;

    let offset = 1;
    let heartRate: number;

    if (is16Bit) {
      heartRate = value.getUint16(offset, true);
      offset += 2;
    } else {
      heartRate = value.getUint8(offset);
      offset += 1;
    }

    return {
      heartRate,
      contactDetected,
    };
  }
}
