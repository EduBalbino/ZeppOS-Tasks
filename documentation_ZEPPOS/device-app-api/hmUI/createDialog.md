
# hmUI.createDialog(option)

![create_dialog](/assets/images/create_dialog-d225bc80b7700c58df2285b98f86b137.jpg)

Create a Dialog.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#type "Direct link to Type")

```
(option: Option) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#parameters "Direct link to Parameters")

### Option: object[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#option-object "Direct link to Option: object")

| Properties | Description | Required | Type |
| --- | --- | --- | --- |
| title | The title of the widget. | YES | `string` |
| show | Whether to display Dialog immediately after the creation is completed, default `false`. | NO | `boolean` |
| click\_linster | Callback function, type: 0 click to cancel, type: 1 click to confirm. | YES | `({type: number}) => void` |
| auto\_hide | Whether the dialog disappears after clicking the "Confirm" or "Cancel" button, default `true`. | NO | `boolean` |

caution

Setting `auto_hide` to `false` allows the Dialog to be shown and hidden manually through the `show` API via the Dialog instance method.

If you need to call routing-related APIs like `hm.goBack` in the popup callback function, it is recommended to set `auto_hide` to `false` to make the page jump smoother. Otherwise, when the page is switched, the Dialog popup will be destroyed first, and then the page will be jumped, which will make the page feel switched once more.

### dialog instance[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#dialog-instance "Direct link to dialog instance")

#### dialog.show()[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#dialogshow "Direct link to dialog.show()")

```
(isShow: boolean) => void  

```

| `isShow` | Description |
| --- | --- |
| `true` | show |
| `false` | hide |

## Code examples[​](/docs/1.0/reference/device-app-api/hmUI/createDialog/#code-examples "Direct link to Code examples")

```
Page({  
  build() {  
    const dialog = hmUI.createDialog({  
      title: 'HELLO ZEPP OS',  
      auto_hide: false,  
      click_linster: ({ type }) => {  
        dialog.show(false)  
        console.log('type', type)  
        console.log('click dialog')  
      }  
    })  
  
    dialog.show(true)  
  }  
})  

```
