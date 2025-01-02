
# SLEEP

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#creating-sensors "Direct link to Creating Sensors")

```
const sleep = hmSensor.createSensor(hmSensor.id.SLEEP)  

```
## SLEEP instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleep-instance "Direct link to SLEEP instance")

### sleep.updateInfo()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepupdateinfo "Direct link to sleep.updateInfo()")

By default, the system updates the sleep data every `30` minutes, the `updateInfo` method is used to trigger the update of the sleep data

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type "Direct link to Type")

```
() => void  

```
### sleep.getSleepStageData()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepgetsleepstagedata "Direct link to sleep.getSleepStageData()")

Get stage sleep information, as an array of variable length

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type-1 "Direct link to Type")

```
() => Array<SleepInfo>  

```
##### SleepInfo[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepinfo "Direct link to SleepInfo")

| Properties | Description | Type |
| --- | --- | --- |
| model | sleep model | `number` |
| start | start time, based on the number of minutes at 0:00 on the day | `number` |
| stop | The end event, based on the number of minutes at 0:00 on the day | `number` |

##### model:number[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#model "Direct link to model")

Search `modelData` in `sleep.getSleepStageModel()`

| value | Description |
| --- | --- |
| `modelData.WAKE_STAGE` | wake stage |
| `modelData.REM_STAGE` | REM stage |
| `modelData.LIGHT_STAGE` | light stage |
| `modelData.DEEP_STAGE` | deep stage |

#### Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#code-example "Direct link to Code example")

```
const sleepStageArray = sleep.getSleepStageData()  
  
for (int i = 0; i < sleepStageArray.length; i++) {  
  const data = sleepStageArray[i];  
  console.log(data.model)  
  console.log(data.start)  
  console.log(data.stop)  
}  

```
### sleep.getSleepStageModel()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepgetsleepstagemodel "Direct link to sleep.getSleepStageModel()")

Get Sleep Mode

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type-2 "Direct link to Type")

```
() => modelData  

```
#### Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#code-example-1 "Direct link to Code example")

```
const modelData = sleep.getSleepStageModel()  
console.log(modelData.WAKE_STAGE)  
console.log(modelData.REM_STAGE)  
console.log(modelData.LIGHT_STAGE)  
console.log(modelData.DEEP_STAGE)  

```
### sleep.getSleepHrData()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepgetsleephrdata "Direct link to sleep.getSleepHrData()")

Obtain the sleep heart rate as a variable-length array, with the `i` item representing the heart rate measurement at the `i` minute of sleep onset

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type-3 "Direct link to Type")

```
() => Array<number>  

```
### sleep.getTotalTime()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepgettotaltime "Direct link to sleep.getTotalTime()")

Get total sleep time

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type-4 "Direct link to Type")

```
() => number  

```
#### Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#code-example-2 "Direct link to Code example")

```
const totalTime = sleep.getTotalTime()  

```
### sleep.getBasicInfo()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#sleepgetbasicinfo "Direct link to sleep.getBasicInfo()")

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#type-5 "Direct link to Type")

```
() => BasicInfo  

```
##### BasicInfo[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#basicinfo "Direct link to BasicInfo")

| Properties | Description | Type |
| --- | --- | --- |
| score | sleep score | `number` |
| deepMin | Deep sleep time in minutes | `number` |
| startTime | Sleep start time, based on the number of minutes at 0:00 on the day | `number` |
| endTime | Sleep end time, the number of minutes from the same base point as the start time | `number` |

#### Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SLEEP/#full-example "Direct link to Full Example")

```
class TextByLine {  
  constructor(params) {  
    const { text = '', y = undefined, line = 0 } = params  
  
    this.text = text  
    this.y = y  
    this.line = line  
    this.y_computed = Number.isInteger(this.y) ? this.y : px(this.line * 60 + 120)  
  }  
  
  render() {  
    return hmUI.createWidget(hmUI.widget.TEXT, {  
      x: px(0),  
      y: this.y_computed,  
      w: px(480),  
      h: px(46),  
      color: 0xffffff,  
      text_size: px(20),  
      align_h: hmUI.align.CENTER_H,  
      align_v: hmUI.align.CENTER_V,  
      text_style: hmUI.text_style.NONE,  
      text: this.text  
    })  
  }  
}  
  
Page({  
  build() {  
    const sleep = hmSensor.createSensor(hmSensor.id.SLEEP)  
  
    const { score, deepMin, startTime, endTime } = sleep.getBasicInfo()  
  
    new TextByLine({  
      text: `score:${score};deepMin:${deepMin};startTime:${startTime};endTime:${endTime}`,  
      line: 0  
    }).render()  
  
    const totalTime = sleep.getTotalTime()  
  
    new TextByLine({  
      text: `totalTime:${totalTime}`,  
      line: 1  
    }).render()  
  
    const modelData = sleep.getSleepStageModel()  
  
    const sleepStageArray = sleep.getSleepStageData();  
  
    for (let i = 0; i < sleepStageArray.length; i++) {  
      const element = sleepStageArray[i];  
      const { model, start, stop } = element  
  
      new TextByLine({  
        text: `model:${model};start:${start};stop:${stop}`,  
        line: i + 2  
      }).render()  
    }  
  
    const hrArr = sleep.getSleepHrData()  
  
    const hrArrWidgetList = hrArr.slice(0, 10)  
  
    for (let i = 0; i < hrArrWidgetList.length; i++) {  
      new TextByLine({  
        text: `hrValue:${hrArrWidgetList[i]}`,  
        line: i + sleepStageArray.length + 3  
      }).render()  
    }  
  }  
})  

```
