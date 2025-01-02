
# hmSetting.setBrightScreenCancel()

Cancel the bright screen time.

You need to call `setBrightScreenCancel` method in the app destroy function after you have called `setBrightScreen` method to set the bright screen time.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreenCancel/#type "Direct link to Type")

```
() => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreenCancel/#parameters "Direct link to Parameters")

### result[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreenCancel/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means the setting was successful | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/setBrightScreenCancel/#code-example "Direct link to Code example")

```
hmSetting.setBrightScreen(10)  
hmSetting.setBrightScreenCancel()  

```
