
# hmFS.SysProGetInt64(key)

Get a 64-bit integer for temporary storage, which will be cleared by system reboot.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt64/#type "Direct link to Type")

```
(key: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt64/#parameters "Direct link to Parameters")

### key[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt64/#key "Direct link to key")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| key string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt64/#result "Direct link to result")

| Description | Type |
| --- | --- |
| stored 64-bit integer | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt64/#usage "Direct link to Usage")

```
hmFS.SysProSetInt64('js_test_int64', 200)  
console.log(hmFS.SysProGetInt64('js_test_int64'))  

```
