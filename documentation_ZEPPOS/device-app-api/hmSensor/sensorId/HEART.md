
# HEART

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#creating-sensors "Direct link to Creating Sensors")

```
const heart = hmSensor.createSensor(hmSensor.id.HEART)  
  
console.log(heart.last)  

```
## HEART instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#heart-instance "Direct link to HEART instance")

### heart: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#heart-object "Direct link to heart: object")

| Properties | Description | Type |
| --- | --- | --- |
| last | The most recent heart rate measurement. Automatic device heart rate monitoring updates the `last` value, and registering a `CURRENT` event to enable continuous heart rate measurement also updates the `last` value | `number` |
| current | The value of the most recent continuous measurement. Registering the `CURRENT` event to enable continuous heart rate measurement will update this `current` value at a certain frequency. There is no point in getting the `current` value if continuous measurement is not enabled | `number` |
| today | The current day's heart rate in minutes from 0:00 to the current moment, returning an array of js up to 60\*24 | `Array<number>` |

## Registering sensor instance callback events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#registering-sensor-instance-callback-events "Direct link to Registering sensor instance callback events")

```
battery.addEventListener(event, callback: Callback)  

```

The heart rate sensor is special, if it uses event callbacks, it is recommended to use `removeEventListener` to unregister it in the `onDestroy` life cycle of the page.

### CURRENT event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#current-event "Direct link to CURRENT event")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#the-value-of-event "Direct link to The value of event")

`heart.event.CURRENT`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#callback "Direct link to Callback")

```
() => void  

```
#### The example of events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#the-example-of-events "Direct link to The example of events")

```
const hrCurrentListener = function () {  
  console.log(heart.current)  
}  
  
heart.addEventListener(heart.event.CURRENT, hrCurrentListener)  

```
### LAST event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#last-event "Direct link to LAST event")

#### The value of event[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#the-value-of-event-1 "Direct link to The value of event")

`heart.event.LAST`

#### Callback[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#callback-1 "Direct link to Callback")

```
() => void  

```
#### The example of events[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#the-example-of-events-1 "Direct link to The example of events")

```
const hrLastListener = function () {  
  console.log(heart.last)  
}  
  
heart.addEventListener(heart.event.LAST, hrLastListener)  

```
## Code Example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/HEART/#code-example "Direct link to Code Example")

An example of a complete heart rate measurement.

```
Page({  
  build() {  
    const heart = hmSensor.createSensor(hmSensor.id.HEART)  
  
    const current = heart.current  
    const last = heart.last  
  
    const text = hmUI.createWidget(hmUI.widget.TEXT, {  
      x: px(0),  
      y: px(120),  
      w: px(480),  
      h: px(46),  
      color: 0xffffff,  
      text_size: px(20),  
      align_h: hmUI.align.CENTER_H,  
      align_v: hmUI.align.CENTER_V,  
      text_style: hmUI.text_style.NONE,  
      text: `CURRENT: ${current}; LAST: ${last}`  
    })  
  
    text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {  
      const current = heart.current  
      const last = heart.last  
  
      text.setProperty(hmUI.prop.MORE, {  
        text: `CURRENT: ${current}; LAST: ${last}`  
      })  
    })  
  
    const currentText = hmUI.createWidget(hmUI.widget.TEXT, {  
      x: px(0),  
      y: px(180),  
      w: px(480),  
      h: px(46),  
      color: 0xffffff,  
      text_size: px(20),  
      align_h: hmUI.align.CENTER_H,  
      align_v: hmUI.align.CENTER_V,  
      text_style: hmUI.text_style.NONE,  
      text: `EVENT-CURRENT: `  
    })  
  
    const lastText = hmUI.createWidget(hmUI.widget.TEXT, {  
      x: px(0),  
      y: px(240),  
      w: px(480),  
      h: px(46),  
      color: 0xffffff,  
      text_size: px(20),  
      align_h: hmUI.align.CENTER_H,  
      align_v: hmUI.align.CENTER_V,  
      text_style: hmUI.text_style.NONE,  
      text: `EVENT-LAST: `  
    })  
  
    const currCallback = () => {  
      const current = heart.current  
  
      currentText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-CURRENT: ${current}`  
      })  
    }  
  
    const heartRateCurrListener = () => {  
      heart.addEventListener(heart.event.CURRENT, currCallback)  
    }  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(300),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'REGISTER_CURRENT',  
      click_func: heartRateCurrListener  
    })  
  
    const lastCallback = () => {  
      const last = heart.last  
  
      lastText.setProperty(hmUI.prop.MORE, {  
        text: `EVENT-LAST: ${last}`  
      })  
    }  
  
    const heartRateLastListener = () => {  
      heart.addEventListener(heart.event.LAST, lastCallback)  
    }  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      x: px(80),  
      y: px(380),  
      w: px(300),  
      h: px(60),  
      radius: px(12),  
      normal_color: 0xfc6950,  
      press_color: 0xfeb4a8,  
      text: 'REGISTER_LAST',  
      click_func: heartRateLastListener  
    })  
  }  
})  

```
