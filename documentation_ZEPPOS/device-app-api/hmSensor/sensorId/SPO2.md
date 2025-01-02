
# SPO2

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#creating-sensors "Direct link to Creating Sensors")

```
const spo2 = hmSensor.createSensor(hmSensor.id.SPO2)  

```
## SPO2 instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#spo2-instance "Direct link to SPO2 instance")

### spo2: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#spo2-object "Direct link to spo2: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | Blood oxygen measurement values | `number` |
| time | time when the result was generated | `number` |
| retcode | result return code | `number` |
| hourAvgofDay | Returns the hourly average blood sample data, length 24 | `Array<number>` |

| `retcode` value | Description |
| --- | --- |
| `0` | Measurement invalid |
| `1` | Continue measuring |
| `2` | Measurement success |
| `3` | Measurement failure |
| `4` | Not wearing |
| `5` | Measurement timeout |
| `6` | Invalid wearing |
| `7` | Invalid signal |
| `8` | Low blood oxygen value |
| `9` | High blood oxygen value |
| `10` | Measurement invalid |

### start[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#start "Direct link to start")

Start blood oxygen measurement

```
spo2.start()  

```

info

It' s recommended to call `stop` before calling the `start` method to stop the last measurement

### stop[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#stop "Direct link to stop")

Cancel blood oxygen measurement

```
spo2.stop()  

```
## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
calorie.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#callback "Direct link to Callback")

```
() => void  

```
## Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/SPO2/#full-example "Direct link to Full Example")

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
    const spo2 = hmSensor.createSensor(hmSensor.id.SPO2)  
  
    new TextByLine({  
      text: `current:${spo2.current};time:${spo2.time};retcode:${spo2.retcode}`,  
      line: 0  
    }).render()  
  
    const changeEventText = new TextByLine({  
      text: `EVENT-CHANGE:${spo2.current}`,  
      line: 1  
    }).render()  
  
    const changeCallback = () => {  
      const current = spo2.current  
      const time = spo2.time  
      const retcode = spo2.retcode  
  
      changeEventText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CHANGE: ${current};${time};${retcode}`  
      })  
    }  
  
    const spo2ChangeListener = () => {  
      spo2.addEventListener(hmSensor.event.CHANGE, changeCallback)  
    }  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(300),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'REGISTER_CHANGE',  
      click_func: spo2ChangeListener  
    })  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(380),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'START',  
      click_func: () => {  
        spo2.stop()  
        spo2.start()  
      }  
    })  
  
    const hourAvgOfDay = spo2.hourAvgOfDay  
  
    for (let i = 0; i < hourAvgOfDay.length; i++) {  
      new TextByLine({  
        text: `index:${i};${hourAvgOfDay[i]}`,  
        line: 8 + i  
      }).render()  
    }  
  }  
})  

```
