
# hmSetting.getMileageUnit()

Returns whether the current distance unit is metric or imperial.

This method is to get the units set by the user and does not represent the units of the data. The units of the data refer to the interface description of the corresponding data.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getMileageUnit/#type "Direct link to Type")

```
() => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getMileageUnit/#parameters "Direct link to Parameters")

### result[  ​](/docs/1.0/reference/device-app-api/hmSetting/getMileageUnit/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The current distance unit, `0`:metric, `1`:imperial, others are invalid | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getMileageUnit/#code-example "Direct link to Code example")

```
const mileageUnit = hmSetting.getMileageUnit()  

```
