declare const hmUI: HmWearableProgram.DeviceSide.HmUI.IHmUI;
declare const hmBle: HmWearableProgram.DeviceSide.IHmBle.IHmBleFunction;
declare const timer: HmWearableProgram.DeviceSide.Timer.IHmTimerFunction;
declare const hmFS: HmWearableProgram.DeviceSide.FS.IHmFs;
declare const hmApp: HmWearableProgram.DeviceSide.App.Constructor;
declare const hmSensor: HmWearableProgram.DeviceSide.HmSensor.IHmSensor;
declare const hmSetting: HmWearableProgram.DeviceSide.HmSetting.IHmSetting;

export function isHmUIDefined(): boolean {
  return typeof hmUI !== 'undefined';
}

export function isHmBleDefined(): boolean {
  return typeof hmBle !== 'undefined';
}

export function isHmTimerDefined(): boolean {
  return typeof timer !== 'undefined';
}

export function isHmFsDefined(): boolean {
  return typeof hmFS !== 'undefined';
}

export function isHmAppDefined(): boolean {
  return typeof hmApp !== 'undefined';
}

export function isHmSensorDefined(): boolean {
  return typeof hmSensor !== 'undefined';
}

export function isHmSettingDefined(): boolean {
  return typeof hmSetting !== 'undefined';
} 