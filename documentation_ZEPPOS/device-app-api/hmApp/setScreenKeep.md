
# hmApp.setScreenKeep(option)

By default, the system will exit the Mini Program after 10s, and the watch will enter the watchface page when it is woken up again.

When `hmApp.setScreenKeep(true)` is set, the system will exit the Mini Program after 10s when the system is triggered to screen off in a page of the Mini Program, and the Mini Program will be reopened and enter the corresponding page when the watch is woken up again.

## Type[​](/docs/1.0/reference/device-app-api/hmApp/setScreenKeep/#type "Direct link to Type")

```
(option: boolean) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmApp/setScreenKeep/#parameters "Direct link to Parameters")

### option[ ​](/docs/1.0/reference/device-app-api/hmApp/setScreenKeep/#option "Direct link to option")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Whether to return to the Mini Program after the screen off for 10s, `true` is yes | Yes | `boolean` | - |

## Code examples[​](/docs/1.0/reference/device-app-api/hmApp/setScreenKeep/#code-examples "Direct link to Code examples")

```
// Screen hold  
hmApp.setScreenKeep(true)  

```
