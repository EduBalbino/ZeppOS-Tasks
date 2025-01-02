
# hmSetting.getDateFormat()

Return the current year, month and day order.

## Type[​](/docs/1.0/reference/device-app-api/hmSetting/getDateFormat/#type "Direct link to Type")

```
() => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmSetting/getDateFormat/#parameters "Direct link to Parameters")

### result: number[​](/docs/1.0/reference/device-app-api/hmSetting/getDateFormat/#result-number "Direct link to result: number")

| Value | Format |
| --- | --- |
| `0` | year-month-day |
| `1` | day-month-year |
| `2` | month-day-year |

## Code example[​](/docs/1.0/reference/device-app-api/hmSetting/getDateFormat/#code-example "Direct link to Code example")

```
const dateFormat = hmSetting.getDateFormat()  

```
