
# hmUI.deleteWidget(widget)

Delete the UI widget.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/deleteWidget/#type "Direct link to Type")

```
(widget: WIDGET) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/deleteWidget/#parameters "Direct link to Parameters")

### WIDGET[​](/docs/1.0/reference/device-app-api/hmUI/deleteWidget/#widget "Direct link to WIDGET")

| Description | Type |
| --- | --- |
| widget object, returned by `hmUI.createWidget` | `number` |

## Code examples[​](/docs/1.0/reference/device-app-api/hmUI/deleteWidget/#code-examples "Direct link to Code examples")

```
Page({  
  build() {  
    const img = hmUI.createWidget(hmUI.widget.IMG, {  
      x: 125,  
      y: 125,  
      src: 'zeppos.png'  
    })  
  
    hmUI.deleteWidget(img)  
  }  
})  

```
