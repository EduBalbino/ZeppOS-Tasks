
# hmFS.SysProSetInt64(key, val)

Stores a temporary 64-bit integer that will be cleared by system reboot.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt64/#type "Direct link to Type")

```
(key: string, val: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt64/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| key | key string | yes | `string` | - |
| val | Stored 64-bit integer | yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt64/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt64/#usage "Direct link to Usage")

```
hmFS.SysProSetInt64('js_test_int64', 200)  
console.log(hmFS.SysProGetInt64('js_test_int64'))  

```
