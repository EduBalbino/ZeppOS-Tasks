
# hmFS.SysProSetChars(key, val)

Store temporary string, system reboot will clear.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetChars/#type "Direct link to Type")

```
(key: string, val: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetChars/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| key | key string | yes | `string` | - |
| val | the stored string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetChars/#result "Direct link to result")

| ` Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProSetChars/#usage "Direct link to Usage")

```
hmFS.SysProSetChars('js_test_char', 'hello')  
console.log(hmFS.SysProGetChars('js_test_char'))  

```
