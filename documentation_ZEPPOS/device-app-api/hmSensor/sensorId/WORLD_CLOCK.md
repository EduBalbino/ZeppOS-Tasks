
# WORLD\_CLOCK

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#creating-sensors "Direct link to Creating Sensors")

```
const world_clock = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK)  

```
## WORLD\_CLOCK instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#world_clock-instance "Direct link to WORLD_CLOCK instance")

### world\_clock.init[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#world_clockinit "Direct link to world_clock.init")

Initialize world clock data

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#type "Direct link to Type")

```
() => void  

```
### world\_clock.getWorldClockCount[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#world_clockgetworldclockcount "Direct link to world_clock.getWorldClockCount")

Get the total number of currently configured world clocks

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#type-1 "Direct link to Type")

```
() => number  

```
### world\_clock.getWorldClockCountInfo(index)[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#world_clockgetworldclockcountinfoindex "Direct link to world_clock.getWorldClockCountInfo(index)")

Get the world clock data corresponding to `index`

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#type-2 "Direct link to Type")

```
(index: number) => wordInfo  

```
##### wordInfo[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#wordinfo "Direct link to wordInfo")

| Properties | Description | Type |
| --- | --- | --- |
| city | city | `string` |
| cityCode | City code, e.g. San Francisco `SFO` | `string` |
| hour | hour | `number` |
| minute | minute | `number` |
| timeZoneHour | Time Zone Hours | `number` |
| timeZoneMinute | Time zone minutes | `number` |

### world\_clock.uninit[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#world_clockuninit "Direct link to world_clock.uninit")

Recycle world clock data, corresponding to `init`

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#type-3 "Direct link to Type")

```
() => void  

```
## Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WORLD_CLOCK/#full-example "Direct link to Full Example")

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
    const world_clock = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK)  
    world_clock.init()  
  
    const count = world_clock.getWorldClockCount()  
  
    for (let index = 0; index < count; index++) {  
      const { city, cityCode, hour, minute, timeZoneHour, timeZoneMinute } = world_clock.getWorldClockInfo(index)  
  
      new TextByLine({  
        text: `city:${city};cityCode:${cityCode};hour:${hour};minute:${minute}`,  
        line: 0 + 2 * index  
      }).render()  
  
      new TextByLine({  
        text: `timeZoneHour:${timeZoneHour};timeZoneMinute:${timeZoneMinute}`,  
        line: 1 + 2 * index  
      }).render()  
    }  
  
    world_clock.uninit()  
  }  
})  

```
