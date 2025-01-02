
# hmSetting.setBrightScreen(brightTime)

Set the bright screen time. When you need the screen to be always on, you can set a larger bright screen time.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreen/#type "Direct link to Type")

```
(brightTime: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreen/#parameters "Direct link to Parameters")

### brightTime[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreen/#brighttime "Direct link to brightTime")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| The bright time of the current device, in seconds, in the range [1, 2147483] | YES | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreen/#result "Direct link to result")

| Dscription | Type |
| --- | --- |
| result, `0` means the setting is successful | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreen/#code-example "Direct link to Code example")

```
const result = hmSetting.setBrightScreen(10)  

```
