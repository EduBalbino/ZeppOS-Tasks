
# hmSetting.getUserData()

Gets the user data.

All properties are `0` when no data is fetched.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getUserData/#type "Direct link to Type")

```
() => userData  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getUserData/#parameters "Direct link to Parameters")

### userData: object[​](/docs/1.0/reference/device-app-api/hmSetting/getUserData/#userdata-object "Direct link to userData: object")

| Property | Description | Type |
| --- | --- | --- |
| age | The user's age, or `0` when there is no data | `number` |
| height | The user's height, a floating-point number, or `0` when there is no data | `number` |
| weight | The user's weight, in floating point numbers, or `0` when there is no data | `number` |
| gender | `0`: MALE, `1`: FEMALE, `2`: UNSPECIFIED | `boolean` |
| nickName | user nickname | `string` |
| region | User registration area (ISO standard) | `string` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getUserData/#code-example "Direct link to Code example")

```
const age = hmSetting.getUserData().age  
const height = hmSetting.getUserData().height  
const weight = hmSetting.getUserData().weight  
const gender = hmSetting.getUserData().gender  
const nickName = hmSetting.getUserData().nickName  

```
