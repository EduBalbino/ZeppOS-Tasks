
# hmSetting.getDiskInfo()

Get disk information.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getDiskInfo/#type "Direct link to Type")

```
() => diskInfo  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getDiskInfo/#parameters "Direct link to Parameters")

### diskInfo: object[​](/docs/1.0/reference/device-app-api/hmSetting/getDiskInfo/#diskinfo-object "Direct link to diskInfo: object")

| Property | Description | Type |
| --- | --- | --- |
| total | total space | `number` |
| free | free space | `number` |
| app | js application space used | `number` |
| watchface | watchface | `number` |
| music | space used for music | `number` |
| system | system used space | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getDiskInfo/#code-example "Direct link to Code example")

```
const diskInfo = hmSetting.getDiskInfo()  
console.log(  
  'disk Info:',  
  diskInfo.total / 1024 / 1024,  
  diskInfo.free / 1024 / 1024,  
  diskInfo.app / 1024 / 1024,  
  diskInfo.watchface / 1024 / 1024,  
  diskInfo.music,  
  diskInfo.system / 1024 / 1024  
)  

```
