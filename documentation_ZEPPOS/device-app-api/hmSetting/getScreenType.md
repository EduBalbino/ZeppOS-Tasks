
# hmSetting.getScreenType()

Get the current screen Screen information.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenType/#type "Direct link to Type")

```
() => screenType  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenType/#parameters "Direct link to Parameters")

### screenType: number[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenType/#screentype-number "Direct link to screenType: number")

| Value | Description |
| --- | --- |
| `hmSetting.screen_type.APP` | Within the js application |
| `hmSetting.screen_type.WATCHFACE` | In the js table main screen |
| `hmSetting.screen_type.SETTINGS` | In the js application configuration or Watchface edit page |
| `hmSetting.screen_type.AOD` | In the hibernation screen |

## Code examples[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenType/#code-examples "Direct link to Code examples")

```
const screenType = hmSetting.getScreenType()  

```
