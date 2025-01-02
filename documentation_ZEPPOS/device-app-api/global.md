
# Framework interface

## Mini Program[​](/docs/1.0/reference/device-app-api/global/#mini-program "Direct link to Mini Program")

### App(Param)[​](/docs/1.0/reference/device-app-api/global/#appparam "Direct link to App(Param)")

Register the Mini Program, accepting a parameter of type `object`, specifying the Mini Program's lifecycle callbacks, etc.

`App()` must be called in `app.js`, must be called and can only be called once.

#### Param: object[​](/docs/1.0/reference/device-app-api/global/#param-object "Direct link to Param: object")

| name | description | required | type | default |
| --- | --- | --- | --- | --- |
| onCreate | Triggered when the Mini Program initialization is completed, only triggered once globally. Can be used to initialize app global data for all pages, `param` parameter is passed from `param` parameter in `hmApp.startApp` | NO | `(param: string) => void` | - |
| onDestroy | Triggered when the Mini Program is destroyed | NO | `() => void` | - |
| other | The developer can add any function or data variable to the `Param` parameter | NO | `any` | - |

Usage reference [Register Mini Program](/docs/1.0/guides/framework/device/app/)

Lifecycle related can be found in [Life Cycle](/docs/1.0/guides/framework/device/life-cycle/)

### getApp()[​](/docs/1.0/reference/device-app-api/global/#getapp "Direct link to getApp()")

Gets the app instance.

Usage: [Register Mini Program](/docs/1.0/guides/framework/device/app/)

### Page[​](/docs/1.0/reference/device-app-api/global/#page "Direct link to Page")

### Page(Param)[​](/docs/1.0/reference/device-app-api/global/#pageparam "Direct link to Page(Param)")

Register a page in the Mini Program, accepting an `object` type parameter, specifying the page's lifecycle callbacks, etc.

#### Param: object[​](/docs/1.0/reference/device-app-api/global/#param-object-1 "Direct link to Param: object")

| name | description | required | type | default |
| --- | --- | --- | --- | --- |
| onInit | Triggered when page initialization is complete, only once per page. Can be used to initialize page global data, the `param` parameter is passed by the `param` parameter in `hmApp.gotoPage` or `hmApp.reloadPage` | NO | `(param: string) => void` | - |
| build | Triggered when page initialization is complete, only once per page. Recommended UI drawing in the `build` lifecycle | NO | `() => void` | - |
| onDestroy | Triggered when the Mini Program is destroyed | NO | `() => void` | - |
| Other | The developer can add any function or data variable to the `Param` parameter | NO | `any` | - |

Usage Reference [Register Page](/docs/1.0/guides/framework/device/page/)

Lifecycle related can be found in [lifecycle](/docs/1.0/guides/framework/device/life-cycle/)

## Basic functions[​](/docs/1.0/reference/device-app-api/global/#basic-functions "Direct link to Basic functions")

### console.log()[​](/docs/1.0/reference/device-app-api/global/#consolelog "Direct link to console.log()")

Console prints a log with any number of parameters.

### px(value)[​](/docs/1.0/reference/device-app-api/global/#pxvalue "Direct link to px(value)")

Tool method for doing screen adaptation.

#### type[​](/docs/1.0/reference/device-app-api/global/#type "Direct link to type")

```
(value: number) => number  

```

Usage reference [Screen Adaptation](/docs/1.0/guides/best-practice/multi-screen-adaption/)

