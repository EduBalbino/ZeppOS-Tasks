
# createTimer(delay, repeat, callback, option)

Create Timer

## Type[​](/docs/1.0/reference/device-app-api/timer/createTimer/#type "Direct link to Type")

```
(delay: number, repeat: number, callback: (option: any) => void, option: any) => timerId  

```
## Parameters[​](/docs/1.0/reference/device-app-api/timer/createTimer/#parameters "Direct link to Parameters")

| Parameter | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| delay | delay (milliseconds) | YES | `number` | - |
| repeat | period (milliseconds) | YES | `number` | - |
| callback | callback function | YES | `(option: any) => void` | - |
| option | callback parameters | YES | `any` | - |

### timerId[​](/docs/1.0/reference/device-app-api/timer/createTimer/#timerid "Direct link to timerId")

| Description | Type |
| --- | --- |
| timer handle | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/timer/createTimer/#usage "Direct link to Usage")

```
//Create timer, delay 500ms to trigger, then execute every 1000ms.  
const timer1 = timer.createTimer(  
  500,  
  1000,  
  function (option) {  
    //callback  
    console.log('timer callback')  
    console.log(option.hour)  
  },  
  { hour: 0, minute: 15, second: 30 }  
)  
  
//Stop timer1  
timer.stopTimer(timer1)  

```
