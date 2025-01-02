
# TIME

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#creating-sensors "Direct link to Creating Sensors")

```
const time = hmSensor.createSensor(hmSensor.id.TIME)  

```
## TIME instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#time-instance "Direct link to TIME instance")

### time: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#time-object "Direct link to time: object")

| Properties | Description | Type |
| --- | --- | --- |
| utc | Timestamp, milliseconds from January 1, 1970 to present | `number` |
| year | year | `number` |
| month | month | `number` |
| day | day | `number` |
| hour | hour | `number` |
| minute | minute | `number` |
| second | second | `number` |
| week | Week `1` - `7`, `1` stands for Monday | `number` |
| is24Hour | Whether 24-hour system | `boolean` |
| format\_hour | Hours in the current time system | `number` |
| lunar\_year | Traditional Chinese Calendar Year | `number` |
| lunar\_month | Traditional Chinese Calendar Month | `number` |
| lunar\_day | Traditional Chinese Calendar Day | `number` |
| lunar\_festival | Traditional Chinese Festival | `string` |
| lunar\_solar\_term | Traditional Chinese Solar Terms | `string` |
| solar\_festival | Gregorian Holidays | `string` |

### time.getLunarMonthCalendar[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#timegetlunarmonthcalendar "Direct link to time.getLunarMonthCalendar")

Get information about the Chinese Lunar Calendar.

```
const lunar_month_cal = time.getLunarMonthCalendar()  
  
for (let i = 0; i < lunar_month_cal.day_count; i++) {  
  console.log('lunar_day : ' + lunar_month_cal.lunar_days_array[i])  
}  

```
### time.getShowFestival[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#timegetshowfestival "Direct link to time.getShowFestival")

Get the holidays displayed on that day (priority: Gregorian holidays, Chinese lunar holidays, Traditional Chinese Solar Terms).

The API only works when the watch language is set to Chinese.

```
const current_festival = time.getShowFestival()  

```
## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
time.addEventListener(event, callback: Callback)  

```
### MINUTEEND event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#minuteend-event "Direct link to MINUTEEND event")

Events at the end of each minute

#### event value[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#event-value "Direct link to event value")

`time.event.MINUTEEND`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#callback "Direct link to Callback")

```
() => void  

```
### DAYCHANGE event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#daychange-event "Direct link to DAYCHANGE event")

Events at the end of each day

#### event value[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#event-value-1 "Direct link to event value")

`time.event.MINUTEEND`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#callback-1 "Direct link to Callback")

```
() => void  

```
## Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/TIME/#full-example "Direct link to Full Example")

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
    const time = hmSensor.createSensor(hmSensor.id.TIME)  
  
    new TextByLine({  
      text: `utc:${time.utc};year:${time.year};month:${time.month};day:${time.day}`,  
      line: 0  
    }).render()  
  
    new TextByLine({  
      text: `hour:${time.hour};minute:${time.minute};second:${time.second};week:${time.week}`,  
      line: 1  
    }).render()  
  
    new TextByLine({  
      text: `format_hour:${time.format_hour};is24Hour:${time.is24Hour}`,  
      line: 2  
    }).render()  
  
    new TextByLine({  
      text: `lunar_year:${time.lunar_year};lunar_month:${time.lunar_month};`,  
      line: 3  
    }).render()  
  
    new TextByLine({  
      text: `lunar_year:${time.lunar_year};lunar_month:${time.lunar_month};lunar_day:${time.lunar_day}`,  
      line: 4  
    }).render()  
  
    new TextByLine({  
      text: `lunar_festival:${time.lunar_festival};lunar_solar_term:${time.lunar_solar_term};solar_festival:${time.solar_festival}`,  
      line: 5  
    }).render()  
  
    new TextByLine({  
      text: `getShowFestival:${time.getShowFestival()}`,  
      line: 6  
    }).render()  
  
    const lunar_month_cal = time.getLunarMonthCalendar()  
  
    for (let i = 0; i < lunar_month_cal.day_count; i++) {  
      new TextByLine({  
        text: `index:${i};lunar_day:${lunar_month_cal.lunar_days_array[i]}`,  
        line: 7 + i  
      }).render()  
    }  
  }  
})  

```
