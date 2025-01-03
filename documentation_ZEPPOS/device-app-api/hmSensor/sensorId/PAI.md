
# PAI

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/PAI/#creating-sensors "Direct link to Creating Sensors")

```
const pai = hmSensor.createSensor(hmSensor.id.PAI)  

```
## PAI instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/PAI/#pai-instance "Direct link to PAI instance")

### pai: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/PAI/#pai-object "Direct link to pai: object")

| Properties | Description | Type |
| --- | --- | --- |
| dailypai | PAI values for today | `number` |
| totalpai | Current cumulative PAI values | `number` |
| prepai0 | PAI values were obtained the six days before today | `number` |
| prepai1 | PAI values were obtained the five days before today | `number` |
| prepai2 | PAI values were obtained the four days before today | `number` |
| prepai3 | PAI values were obtained the three days before today | `number` |
| prepai4 | PAI values were obtained the day before yesterday | `number` |
| prepai5 | PAI values were obtained yesterday | `number` |
| prepai6 | PAI values obtained on the same day | `number` |

## Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/PAI/#full-example "Direct link to Full Example")

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
    const pai = hmSensor.createSensor(hmSensor.id.PAI)  
  
    new TextByLine({  
      text: `dailypai:${pai.dailypai}`,  
      line: 0  
    }).render()  
  
    new TextByLine({  
      text: `totalpai:${pai.totalpai}`,  
      line: 1  
    }).render()  
  
    new TextByLine({  
      text: `prepai0:${pai.prepai0}`,  
      line: 2  
    }).render()  
  
    new TextByLine({  
      text: `prepai1:${pai.prepai1}`,  
      line: 3  
    }).render()  
  
    new TextByLine({  
      text: `prepai2:${pai.prepai2}`,  
      line: 4  
    }).render()  
  
    new TextByLine({  
      text: `prepai3:${pai.prepai3}`,  
      line: 5  
    }).render()  
  
    new TextByLine({  
      text: `prepai4:${pai.prepai4}`,  
      line: 6  
    }).render()  
  
    new TextByLine({  
      text: `prepai5:${pai.prepai5}`,  
      line: 7  
    }).render()  
  
    new TextByLine({  
      text: `prepai6:${pai.prepai6}`,  
      line: 8  
    }).render()  
  }  
})  

```
