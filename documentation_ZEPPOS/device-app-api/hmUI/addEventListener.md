
# widget.addEventListener(eventId, callback)

Register a listener to the UI widget and the given callback function will be executed when the specified event is triggered.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/addEventListener/#type "Direct link to Type")

```
(eventId: EventId, callback: (event: Event) => void) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/addEventListener/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| eventId | Event type. (e.g., `hmUI.event.MOVE`, `hmUI.event.CLICK_DOWN`, etc.) | `EventId` |
| event | Event details, refer to different events. | `object` |

### EventId[​](/docs/1.0/reference/device-app-api/hmUI/addEventListener/#eventid "Direct link to EventId")

| Value | Description |
| --- | --- |
| `hmUI.event.MOVE` | Slide |
| `hmUI.event.CLICK_DOWN` | Press |
| `hmUI.event.CLICK_UP` | Lift up |
| `hmUI.event.MOVE_IN` | Move in |
| `hmUI.event.MOVE_OUT` | Move out |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/addEventListener/#code-example "Direct link to Code example")

```
const img_bkg = hmUI.createWidget(hmUI.widget.IMG)  
  
img_bkg.addEventListener(hmUI.event.CLICK_DOWN, function (info) {  
  //Registering event listeners.  
  console.log(info.x)  
})  

```
