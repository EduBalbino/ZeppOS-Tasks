
# hmApp.startApp(option)

Start the app

## Type[​](/docs/1.0/reference/device-app-api/hmApp/startApp/#type "Direct link to Type")

```
(option: Option) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmApp/startApp/#parameters "Direct link to Parameters")

### Option: object[​](/docs/1.0/reference/device-app-api/hmApp/startApp/#option-object "Direct link to Option: object")

| Attribute | Description | Required | Type | Default value |
| --- | --- | --- | --- | --- |
| appid | Application ID | YES | `number` | - |
| url | Jump path | YES | `string` | - |
| native | - | NO | `boolean` | `false` |
| param | Parameters passed to the `onCreate` life cycle in the `App` constructor | NO | `string` | - |

## Code examples[​](/docs/1.0/reference/device-app-api/hmApp/startApp/#code-examples "Direct link to Code examples")

```
// Start the app with appid 1000001  
hmApp.startApp({ appid: 1000001, url: 'pages/index2', param: '...' })  

```
