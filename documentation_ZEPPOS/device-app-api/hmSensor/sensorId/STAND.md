
# STAND

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#creating-sensors "Direct link to Creating Sensors")

```
const stand = hmSensor.createSensor(hmSensor.id.STAND)  
  
console.log(stand.current)  

```
## STAND instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#stand-instance "Direct link to STAND instance")

### stand: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#stand-object "Direct link to stand: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | Number of hours with current standing behavior | `number` |
| target | Number of hours with standing targets | `number` |

## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
calorie.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#callback "Direct link to Callback")

```
() => void  

```
#### Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/STAND/#full-example "Direct link to Full Example")

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
    const stand = hmSensor.createSensor(hmSensor.id.STAND)  
  
    new TextByLine({  
      text: `current:${stand.current};target:${stand.target}`,  
      line: 0  
    }).render()  
  
    const changeEventText = new TextByLine({  
      text: `EVENT-CHANGE:${stand.current}`,  
      line: 1  
    }).render()  
  
    const changeCallback = () => {  
      const current = stand.current  
  
      changeEventText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CHANGE: ${current}`  
      })  
    }  
  
    const standChangeListener = () => {  
      stand.addEventListener(hmSensor.event.CHANGE, changeCallback)  
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
      click_func: standChangeListener  
    })  
  }  
})  

```
