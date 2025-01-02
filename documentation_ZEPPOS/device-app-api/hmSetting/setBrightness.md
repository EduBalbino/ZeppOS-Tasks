
# hmSetting.setBrightness(brightness)

Sets the screen brightness of the current device, in the range [0, 100].

If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect. You need to turn off auto-brightness first and then set the screen brightness.

If you exit the page, you need to consider whether you need to set the brightness back to the original one.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightness/#type "Direct link to Type")

```
(brightness: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightness/#parameters "Direct link to Parameters")

### brightness[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightness/#brightness "Direct link to brightness")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Set the brightness of the current device, range [0, 100] | Yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightness/#result "Direct link to result")

| Description | Type |
| --- | --- |
| result, `0` means the setting is successful | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightness/#code-example "Direct link to Code example")

```
const result = hmSetting.setBrightness(50)  

```
