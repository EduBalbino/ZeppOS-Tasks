
# hmSetting.setScreenAutoBright(isAutoBright)

Set whether auto-brightness is enabled or not.

If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/setScreenAutoBright/#type "Direct link to Type")

```
(isAutoBright: boolean) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/setScreenAutoBright/#parameters "Direct link to Parameters")

### isAutoBright[​](/docs/1.0/reference/device-app-api/hmSetting/setScreenAutoBright/#isautobright "Direct link to isAutoBright")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Whether to open the automatic brightness | YES | `boolean` | - |

### result[​](/docs/1.0/reference/device-app-api/hmSetting/setScreenAutoBright/#result "Direct link to result")

| Description | Type |
| --- | --- |
| result, `0` means the setting is successful | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/setScreenAutoBright/#code-example "Direct link to Code example")

```
const result = hmSetting.setScreenAutoBright(true)  

```
