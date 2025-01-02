
# CALORIE

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#creating-sensors "Direct link to Creating Sensors")

```
const calorie = hmSensor.createSensor(hmSensor.id.CALORIE)  

```
### CALORIE instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#calorie-instance "Direct link to CALORIE instance")

### calorie: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#calorie-object "Direct link to calorie: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | Current calorie consumption in kcal | `number` |
| target | Target calorie consumption in kcal | `number` |

## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
calorie.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#callback "Direct link to Callback")

```
() => void  

```
#### Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/CALORIE/#full-example "Direct link to Full Example")

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
    const calorie = hmSensor.createSensor(hmSensor.id.CALORIE)  
  
    const currentText = new TextByLine({  
      text: `current:${calorie.current};target:${calorie.target}`,  
      line: 0  
    }).render()  
  
    const changeEventText = new TextByLine({  
      text: `EVENT-CHANGE:${calorie.current}`,  
      line: 1  
    }).render()  
  
    const changeCallback = () => {  
      const current = calorie.current  
  
      changeEventText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CHANGE: ${current}`  
      })  
    }  
  
    const calorieChangeListener = () => {  
      calorie.addEventListener(hmSensor.event.CHANGE, changeCallback)  
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
      click_func: calorieChangeListener  
    })  
  }  
})  

```
