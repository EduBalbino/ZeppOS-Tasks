
# FAT\_BURRING

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#creating-sensors "Direct link to Creating Sensors")

```
const fatburn = hmSensor.createSensor(hmSensor.id.FAT_BURRING)  

```
## FAT\_BURRING instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#fat_burring-instance "Direct link to FAT_BURRING instance")

### fatburn: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#fatburn-object "Direct link to fatburn: object")

| Properties | Description | Type |
| --- | --- | --- |
| current | Current fat burning minutes | `number` |
| target | Fat burning target in minutes | `number` |

info

Fat burning target is `30` minutes, this value cannot be changed by setting

## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
fatburn.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#callback "Direct link to Callback")

```
() => void  

```
#### The example of the events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/FAT_BURRING/#the-example-of-the-events "Direct link to The example of the events")

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
    const fatburn = hmSensor.createSensor(hmSensor.id.FAT_BURRING)  
  
    const currentText = new TextByLine({  
      text: `current:${fatburn.current};target:${fatburn.target}`,  
      line: 0  
    }).render()  
  
    const changeEventText = new TextByLine({  
      text: `EVENT-CHANGE:${fatburn.current}`,  
      line: 1  
    }).render()  
  
    const changeCallback = () => {  
      const current = fatburn.current  
  
      changeEventText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CHANGE: ${current}`  
      })  
    }  
  
    const fatburnChangeListener = () => {  
      fatburn.addEventListener(hmSensor.event.CHANGE, changeCallback)  
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
      click_func: fatburnChangeListener  
    })  
  }  
})  

```
