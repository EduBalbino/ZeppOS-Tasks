
# hmFS.SysProSetBool(key, val)

Store temporary boolean value, system reboot will clear it.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetBool/#type "Direct link to Type")

```
(key: string, val: boolean) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetBool/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| key | key string | yes | `string` | - |
| val | Stored boolean value | yes | `boolean` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetBool/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetBool/#usage "Direct link to Usage")

```
hmFS.SysProSetBool('test_key', true)  

```
