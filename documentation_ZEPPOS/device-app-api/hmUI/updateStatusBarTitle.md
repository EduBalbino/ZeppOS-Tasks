
# hmUI.updateStatusBarTitle(title)

This interface is only available on square screen devices, set the status bar to display text content.

For square screen title bar, refer to [Screen Adaptation](/docs/1.0/guides/best-practice/multi-screen-adaption/).

## Type[​](/docs/1.0/reference/device-app-api/hmUI/updateStatusBarTitle/#type "Direct link to Type")

```
(title: string) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/updateStatusBarTitle/#parameters "Direct link to Parameters")

| parameter | description | type |
| --- | --- | --- |
| title | Status bar display text | `string` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/updateStatusBarTitle/#code-example "Direct link to Code example")

```
const title = 'Mini Program Title'  
  
hmUI.updateStatusBarTitle(title)  

```
