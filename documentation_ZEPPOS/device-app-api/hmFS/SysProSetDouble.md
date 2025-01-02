
# hmFS.SysProSetDouble(key, val)

Store temporary double precision floating point numbers, system reboot will clear.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetDouble/#type "Direct link to Type")

```
(key: string, val: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetDouble/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| key | key string | yes | `string` | - |
| val | The double-precision floating point number to store | Yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetDouble/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetDouble/#usage "Direct link to Usage")

```
hmFS.SysProSetDouble('js_test_double', 3.14)  
console.log(hmFS.SysProGetDouble('js_test_double'))  

```
