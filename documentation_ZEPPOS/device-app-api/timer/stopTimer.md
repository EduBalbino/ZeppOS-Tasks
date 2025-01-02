
# stopTimer(timerID)

Delete Timer

## Type[​](/docs/1.0/reference/device-app-api/timer/stopTimer/#type "Direct link to Type")

```
(timerId: number) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/timer/stopTimer/#parameters "Direct link to Parameters")

### timerId[​](/docs/1.0/reference/device-app-api/timer/stopTimer/#timerid "Direct link to timerId")

| Description | Type |
| --- | --- |
| timer handle, returned when the timer object is created | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/timer/stopTimer/#code-example "Direct link to Code example")

```
const timer1 = timer.createTimer(  
  500,  
  1000,  
  function (option) {  
    console.log('timer callback')  
    console.log(option.hour)  
  },  
  { hour: 0, minute: 15, second: 30 }  
)  
  
timer.stopTimer(timer1)  

```
