
# MUSIC

Control the watch to play music using the speaker

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#creating-sensors "Direct link to Creating Sensors")

```
const music = hmSensor.createSensor(hmSensor.id.MUSIC)  

```
## MUSIC instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#music-instance "Direct link to MUSIC instance")

### music: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#music-object "Direct link to music: object")

| Properties | Description | Type |
| --- | --- | --- |
| artist | artist name | `string` |
| title | music name | `string` |
| isPlaying | Play status `true`: playing, `false`: not playing | `boolean` |

caution

Some devices do not have speakers, and if an error is reported for creating a sensor, the device does not support

### music.audInit()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#musicaudinit "Direct link to music.audInit()")

Initialize music controls

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#type "Direct link to Type")

```
() => void  

```
### music.audPlay()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#musicaudplay "Direct link to music.audPlay()")

Play

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#type-1 "Direct link to Type")

```
() => void  

```
### music.audPause()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#musicaudpause "Direct link to music.audPause()")

Pause

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#type-2 "Direct link to Type")

```
() => void  

```
### music.audPrev()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#musicaudprev "Direct link to music.audPrev()")

Previous

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#type-3 "Direct link to Type")

```
() => void  

```
### music.audNext()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#musicaudnext "Direct link to music.audNext()")

Next

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#type-4 "Direct link to Type")

```
() => void  

```
## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
music.addEventListener(event, callback: Callback)  

```
### The events of CHANGE[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#the-events-of-change "Direct link to The events of CHANGE")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#the-value-of-event "Direct link to The value of event")

`hmSensor.event.CHANGE`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#callback "Direct link to Callback")

```
() => void  

```
#### The example of events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#the-example-of-events "Direct link to The example of events")

```
music.addEventListener(hmSensor.event.CHANGE, function () {  
  console.log("The current song's name: " + music.title + '\r\n')  
})  

```
## Full Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/MUSIC/#full-example "Direct link to Full Example")

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
    const music = hmSensor.createSensor(hmSensor.id.MUSIC)  
  
    music.audInit()  
  
    const { title, artist, isPlaying } = music  
  
    const infoText = new TextByLine({  
      text: `title:${title};artist:${artist};isPlaying:${isPlaying}`,  
      line: 0  
    }).render()  
  
    music.addEventListener(hmSensor.event.CHANGE, function () {  
      const { title, artist, isPlaying } = music  
  
      infoText.setProperty(hmUI.prop.MORE, {  
        text: `title:${title};artist:${artist};isPlaying:${isPlaying}`,  
      })  
    })  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(240),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'PLAY',  
      click_func: () => {  
        music.audPlay()  
      }  
    })  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(320),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'PAUSE',  
      click_func: () => {  
        music.audPause()  
      }  
    })  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(400),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'PREV',  
      click_func: () => {  
        music.audPrev()  
      }  
    })  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(480),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'NEXT',  
      click_func: () => {  
        music.audNext()  
      }  
    })  
  }  
})  

```
