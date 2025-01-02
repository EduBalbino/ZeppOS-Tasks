
# widget.setEnable()

Set whether the widget responds to screen gesture interaction events, the default is to respond.

If the widgets are stacked in the Z-axis direction, the widgets above the stack will block events and the widgets below will not receive events such as `CLICK_DOWN` and `CLICK_UP`. If you want the widgets below to receive gesture events, set `widget.setEnable(false)` for the widgets stacked above.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/setEnable/#type "Direct link to Type")

```
(response: boolean) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/setEnable/#parameters "Direct link to Parameters")

### response[​](/docs/1.0/reference/device-app-api/hmUI/setEnable/#response "Direct link to response")

| Description | Type |
| --- | --- |
| Whether the widget responds to gesture interaction events, `true` responds, `false` does not respond | `boolean` |

