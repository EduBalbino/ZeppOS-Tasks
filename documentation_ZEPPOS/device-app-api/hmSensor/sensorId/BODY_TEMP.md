
# BODY\_TEMP

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BODY_TEMP/#creating-sensors "Direct link to Creating Sensors")

```
const thermometer = hmSensor.createSensor(hmSensor.id.BODY_TEMP)  

```
### BODY\_TEMP instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BODY_TEMP/#body_temp-instance "Direct link to BODY_TEMP instance")

### thermometer: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BODY_TEMP/#thermometer-object "Direct link to thermometer: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | current temperature | `number` |
| timeinterval | time elapsed since the value was set | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BODY_TEMP/#code-example "Direct link to Code example")

```
console.log(  
  'the current temp: ' + thermometer.current + ' interval:' + thermometer.timeinterval + '\r\n'  
)  

```
