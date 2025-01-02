
# hmUI.setLayerScrolling(enable)

Set scrolling for the default layer.

This interface sets the scrolling (continuous scrolling) of the default layer of the js widget, with a lower priority than `setScrollView`, which sets the scrolling by page. If the former is turned on, the former takes precedence.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/setLayerScrolling/#type "Direct link to Type")

```
(enable: boolean) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/setLayerScrolling/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| enable | `true` to set slidable. | `boolean` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/setLayerScrolling/#code-example "Direct link to Code example")

```
hmUI.setLayerScrolling(false) //Turn off scrolling for the default layer.  

```
