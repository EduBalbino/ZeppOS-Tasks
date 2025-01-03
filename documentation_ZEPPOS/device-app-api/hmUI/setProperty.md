
# widget.setProperty(propertyId, val)

Set the properties of the UI widget.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/setProperty/#type "Direct link to Type")

```
(propertyId: string, val: any) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/setProperty/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| propertyId | The property of ID. | `PropertyId` |
| val | Set the value. (when property is `hmUI.prop.MORE`, val is used in the same way as createWidget's option, which can set multiple parameters.) | `any` |

### PropertyId[​](/docs/1.0/reference/device-app-api/hmUI/setProperty/#propertyid "Direct link to PropertyId")

List the properties commonly supported by the widgets.

| Properties | Description | Type |
| --- | --- | --- |
| x | The x-axis coordinate of the widget. | `number` |
| y | The y-axis coordinate of the widget. | `number` |
| w | The width of the widget. | `number` |
| h | The height of the widget. | `number` |
| VISIBLE | Whether the widget is visible or not, `true` is visible, `false` is not, this property does not support `setProperty(hmUI.prop.MORE, {})`, only `setProperty` sets the `VISIBLE` property alone | `boolean` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/setProperty/#code-example "Direct link to Code example")

```
const button = hmUI.createWidget(hmUI.widget.BUTTON, Param)  
button.setProperty(hmUI.prop.VISIBLE, false)  
  
const text = hmUI.createWidget(hmUI.widget.TEXT, Param)  
text.setProperty(hmUI.prop.MORE, {  
  x: 0,  
  y: 0,  
  w: 200,  
  h: 200,  
  text: 'hello',  
  color: 0x34e073,  
  align_h: hmUI.align.LEFT  
})  

```
