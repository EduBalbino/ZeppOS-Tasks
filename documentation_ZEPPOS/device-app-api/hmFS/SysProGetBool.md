
# hmFS.SysProGetBool(key)

Get the temporarily stored boolean value, which will be cleared by system reboot.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetBool/#type "Direct link to Type")

```
(key: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetBool/#parameters "Direct link to Parameters")

### key[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetBool/#key "Direct link to key")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| key string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetBool/#result "Direct link to result")

| Description | Type |
| --- | --- |
| Stored boolean values | `boolean` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetBool/#usage "Direct link to Usage")

```
const result = hmFS.SysProGetBool('test_key')  
console.log(result)  

```
