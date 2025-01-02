
# STRESS

danger

STRESS sensor is temporarily unavailable

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#creating-sensors "Direct link to Creating Sensors")

```
const stress = hmSensor.createSensor(hmSensor.id.STRESS)  
  
console.log(stress.current)  
console.log(stress.time)  

```
### STRESS instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#stress-instance "Direct link to STRESS instance")

### stress: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#stress-object "Direct link to stress: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | current pressure value | `number` |
| time | time when the pressure value was generated | `number` |

## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
calorie.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#callback "Direct link to Callback")

```
() => void  

```
#### The example of events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STRESS/#the-example-of-events "Direct link to The example of events")

```
stress.addEventListener(hmSensor.event.CHANGE, function () {  
  console.log(stress.current)  
  
  console.log('the stress time: ' + stress.time + ' stress: ' + stress.current + '\r\n')  
})  

```
