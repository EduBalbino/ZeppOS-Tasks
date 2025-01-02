
# hmSetting.getDeviceInfo()

Gets the device information.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getDeviceInfo/#type "Direct link to Type")

```
() => deviceInfo  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getDeviceInfo/#parameters "Direct link to Parameters")

### deviceInfo: object[​](/docs/1.0/reference/device-app-api/hmSetting/getDeviceInfo/#deviceinfo-object "Direct link to deviceInfo: object")

| Property | Description | Type |
| --- | --- | --- |
| width | width of the device screen | `number` |
| height | device screen height | `number` |
| screenShape | Screen shape, `0`-square screen, `1`-round screen | `number` |
| deviceName | device name | `string` |
| keyNumber | number of keys | `number` |
| deviceSource | device code | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getDeviceInfo/#code-example "Direct link to Code example")

```
const deviceInfo = hmSetting.getDeviceInfo()  

```
