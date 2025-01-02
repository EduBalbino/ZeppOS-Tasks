
# hmUI.showToast(option)

![show_toast](/assets/images/show_toast-86490b4de75db0b7370e4318e70c7295.jpg)

Show Toast with `\n` text line feed support.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/showToast/#type "Direct link to Type")

```
(option: Option) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/showToast/#parameters "Direct link to Parameters")

### Option: object[​](/docs/1.0/reference/device-app-api/hmUI/showToast/#option-object "Direct link to Option: object")

| Properties | Description | Type |
| --- | --- | --- |
| text | The text content of toast. | `string` |

## Code examples[​](/docs/1.0/reference/device-app-api/hmUI/showToast/#code-examples "Direct link to Code examples")

```
Page({  
  build() {  
    hmUI.showToast({  
      text: 'Hello\nZepp OS'  
    })  
  }  
})  

```
