
# hmFS.SysProSetInt(key, val)

Store temporary integer, system reboot will clear.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt/#type "Direct link to Type")

```
(key: string, val: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| key | key string | yes | `string` | - |
| val | the stored integer | yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetInt/#usage "Direct link to Usage")

```
hmFS.SysProSetInt('js_test_int', 100)  
console.log(hmFS.SysProGetInt('js_test_int'))  

```
