
# hmFS.SysProGetChars(key)

Get the temporarily stored string, system reboot will clear it.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetChars/#type "Direct link to Type")

```
(key: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetChars/#parameters "Direct link to Parameters")

### key[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetChars/#key "Direct link to key")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| key string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetChars/#result "Direct link to result")

| Description | Type |
| --- | --- |
| stored string | `string` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetChars/#usage "Direct link to Usage")

```
hmFS.SysProSetChars('js_test_char', 'hello')  
console.log(hmFS.SysProGetChars('js_test_char'))  

```
