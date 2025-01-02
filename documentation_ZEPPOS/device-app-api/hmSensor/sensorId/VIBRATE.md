
# VIBRATE

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#creating-sensors "Direct link to Creating Sensors")

```
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)  

```
## VIBRATE instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#vibrate-instance "Direct link to VIBRATE instance")

caution

Pages can only create one instance of the `VIBRATE` sensor and cannot be created more than once

### vibrate: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#vibrate-object "Direct link to vibrate: object")

| Properties | Description | Type |
| --- | --- | --- |
| scene | vibration scene setting | `number` |

#### scene: number[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#scene-number "Direct link to scene: number")

| Value | Description |
| --- | --- |
| `23` | Light vibration intensity and short time (20ms) |
| `24` | Medium vibration intensity, short time (20ms) |
| `25` | High vibration intensity and short time (20ms) |
| `27` | High vibration intensity, lasting 1000ms |
| `28` | High vibration intensity, lasting 600ms |
| `0` | Two short, continuous vibrations, consistent with the watch message notification vibration feedback |
| `1` | High vibration intensity, single vibration twice in 500ms, continuous vibration, need to manually `stop` before it will stop, consistent with the watch call vibration feedback |
| `5` | High vibration intensity, single long vibration 500ms, continuous vibration, need to manually `stop` before stopping, consistent with the watch alarm clock, countdown vibration feedback |
| `9` | High vibration intensity, four vibrations in 1200ms, can be used for stronger reminders |

### vibrate.start[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#vibratestart "Direct link to vibrate.start")

`vibrate` instance starts the scene vibration, after calling `start` you must call `stop` after the vibration is finished, otherwise the next call to `start` will not vibrate

```
vibrate.start()  

```
### vibrate.stop[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#vibratestop "Direct link to vibrate.stop")

Example of stopping a scene from vibrating

```
vibrate.stop()  

```
## Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/VIBRATE/#code-example "Direct link to Code example")

```
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)  
  
function click() {  
  vibrate.stop()  
  vibrate.scene = 25  
  vibrate.start()  
}  
  
click()  
  
Page({  
  onDestroy() {  
    vibrate && vibrate.stop()  
  }  
})  

```
