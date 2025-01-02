
# hmApp.reloadPage(option)

Current screen reloads the page.

## Type[​](/docs/1.0/reference/device-app-api/hmApp/reloadPage/#type "Direct link to Type")

```
(option: Option) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmApp/reloadPage/#parameters "Direct link to Parameters")

### Option[​](/docs/1.0/reference/device-app-api/hmApp/reloadPage/#option "Direct link to Option")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| url | jump path | yes | `string` | - |
| param | parameters | no | `string` | - |

## Code example[​](/docs/1.0/reference/device-app-api/hmApp/reloadPage/#code-example "Direct link to Code example")

```
// Loading pages/index3.js   
hmApp.reloadPage({ url: 'pages/index3', param: '...' })  

```
