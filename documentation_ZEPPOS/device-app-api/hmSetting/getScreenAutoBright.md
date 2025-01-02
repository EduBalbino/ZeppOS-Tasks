
# hmSetting.getScreenAutoBright()

Returns whether the current device has auto-brightness enabled.

If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenAutoBright/#type "Direct link to Type")

```
() => result  

```
## Return value[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenAutoBright/#return-value "Direct link to Return value")

### result[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenAutoBright/#result "Direct link to result")

| Description | Type |
| --- | --- |
| Returns whether auto-brightness is enabled for the current device, `true` is enabled | `boolean` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getScreenAutoBright/#code-example "Direct link to Code example")

```
const isAutoBright = hmSetting.getScreenAutoBright()  

```
