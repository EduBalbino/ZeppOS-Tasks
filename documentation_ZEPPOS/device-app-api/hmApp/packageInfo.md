
# hmApp.packageInfo()

Get the information from [Mini Program Configuration](/docs/1.0/reference/app-json/)

## Type[​](/docs/1.0/reference/device-app-api/hmApp/packageInfo/#type "Direct link to Type")

```
() => Package  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmApp/packageInfo/#parameters "Direct link to Parameters")

### Package[​](/docs/1.0/reference/device-app-api/hmApp/packageInfo/#package "Direct link to Package")

Only the attribute names are listed here, please refer to [Mini Program Configuration](/docs/1.0/reference/app-json/) for attribute descriptions and detailed types

| Properties |
| --- |
| name |
| type |
| version |
| icon |
| appId |
| description |
| vendor |
| pages |

## Code example[​](/docs/1.0/reference/device-app-api/hmApp/packageInfo/#code-example "Direct link to Code example")

```
const { name } = hmApp.packageInfo()  
  
console.log(name)  

```
