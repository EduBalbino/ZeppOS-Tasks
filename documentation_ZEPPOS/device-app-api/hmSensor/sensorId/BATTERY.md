
# BATTERY

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#creating-sensors "Direct link to Creating Sensors")

```
const battery = hmSensor.createSensor(hmSensor.id.BATTERY)  

```
## Battery instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#battery-instance "Direct link to Battery instance")

### battery: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#battery-object "Direct link to battery: object")

| Properties | Description | Type |
| --- | --- | --- |
| current- | current power | `number` |

## Registering sensor instance callback events.[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events.")

```
battery.addEventListener(event, callback: Callback)  

```
### the events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#the-events-of-change "Direct link to the events of CHANGE")

#### The value of events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#the-value-of-events "Direct link to The value of events")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#callback "Direct link to Callback")

```
() => void  

```
#### Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/BATTERY/#full-example "Direct link to Full Example")

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
    const battery = hmSensor.createSensor(hmSensor.id.BATTERY)  
  
    const currentText = new TextByLine({  
      text: `current:${battery.current}`,  
      line: 0  
    }).render()  
  
    const changeEventText = new TextByLine({  
      text: `EVENT-CHANGE:${battery.current}`,  
      line: 1  
    }).render()  
  
    const changeCallback = () => {  
      const current = battery.current  
  
      changeEventText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CHANGE: ${current}`  
      })  
    }  
  
    const batteryChangeListener = () => {  
      battery.addEventListener(hmSensor.event.CHANGE, changeCallback)  
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
      click_func: batteryChangeListener  
    })  
  }  
})  

```
