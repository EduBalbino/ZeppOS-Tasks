
# hmFS.SysProGetDouble(key)

Get the temporarily stored double precision character points, system reboot will clear.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetDouble/#type "Direct link to Type")

```
(key: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetDouble/#parameters "Direct link to Parameters")

### key[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetDouble/#key "Direct link to key")

| Description | Required | Type | Default |
| -----=----- | -------- | -------- | ------ |
| key string | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetDouble/#result "Direct link to result")

| Description | Type |
| --- | --- |
| stored double-precision floating-point number | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/SysProGetDouble/#usage "Direct link to Usage")

```
hmFS.SysProSetDouble('js_test_double', 3.14)  
console.log(hmFS.SysProGetDouble('js_test_double'))  

```
