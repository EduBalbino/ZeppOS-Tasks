
# hmFS.SysProGetInt(key)

Get the temporarily stored integer that will be cleared by system reboot.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt/#type "Direct link to Type")

```
(key: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt/#parameters "Direct link to Parameters")

### key[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt/#key "Direct link to key")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| key string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt/#result "Direct link to result")

| Description- | Type |
| --- | --- |
| stored integer | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetInt/#usage "Direct link to Usage")

```
hmFS.SysProSetInt('js_test_int', 100)  
console.log(hmFS.SysProGetInt('js_test_int'))  

```
