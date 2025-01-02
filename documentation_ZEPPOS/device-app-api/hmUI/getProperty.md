
# widget.getProperty(key)

Get the UI widget properties, use `widget.getProperty(hmUI.prop.MORE, {})` to get all the properties of the widget.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/getProperty/#type "Direct link to Type")

```
(key: any) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/getProperty/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| key | The value of property. | `any` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/getProperty/#code-example "Direct link to Code example")

```
const img_bkg = hmUI.createWidget(hmUI.widget.IMG)  
const prop = img_bkg.getProperty(hmUI.prop.MORE, {})  
const { angle, w, h } = prop  
  
const imgHeight = img_bkg.getProperty(hmUI.prop.H)  

```

caution

At this stage, some widgets do not support property acquisition, it is recommended to try to get first, if you can not get the value, you can refer to the following code snippet, manually maintain a variable in the current page to record the corresponding property changes


```
Page({  
  state: {  
    buttonY: 0  
  },  
  build() {  
    this.state.buttonY = 300  
  
    hmUI.createWidget(hmUI.widget.BUTTON, {  
      y: this.state.buttonY,  
      // ...  
    })  
  
    hmUI.showToast({  
      text: this.state.buttonY  
    })  
  }  
})  

```
