
# widget.removeEventListener(eventId, function)

Remove event listeners registered by the UI widget using the `widget.addEventListener` method.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/removeEventListener/#type "Direct link to Type")

```
(eventId: EventId, callback) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/removeEventListener/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| eventId | Event type (e.g., swipe, press, lift, etc.) | `number` |
| callback | The callback function to register. | `function` |

### EventId[​](/docs/1.0/reference/device-app-api/hmUI/removeEventListener/#eventid "Direct link to EventId")

Refer to the `EventId` of `addEventListener`.

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/removeEventListener/#code-example "Direct link to Code example")

```
const img_bkg = hmUI.createWidget(hmUI.widget.IMG)  
const listenerFunc = (info) => {  
  console.log(info.x)  
}  
  
img_bkg.addEventListener(hmUI.event.DOWN, listenerFunc)  
img_bkg.removeEventListener(hmUI.event.DOWN, listenerFunc)  

```
