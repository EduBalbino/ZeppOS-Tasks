
# hmApp.gotoPage(option)

Skip to next page.

## Type[​](/docs/1.0/reference/device-app-api/hmApp/gotoPage/#type "Direct link to Type")

```
(option: Option) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmApp/gotoPage/#parameters "Direct link to Parameters")

### Option: object[​](/docs/1.0/reference/device-app-api/hmApp/gotoPage/#option-object "Direct link to Option: object")

| property | description | required | type | default |
| --- | --- | --- | --- | --- |
| url | jump-path | YES | `string` | - |
| param | Parameters passed to the `onInit` life cycle in the `Page` constructor | NO | `string` | - |

## Code example[​](/docs/1.0/reference/device-app-api/hmApp/gotoPage/#code-example "Direct link to Code example")

```
// loading pages/index2.js  
hmApp.gotoPage({ url: 'pages/index2', param: '...' })  

```
