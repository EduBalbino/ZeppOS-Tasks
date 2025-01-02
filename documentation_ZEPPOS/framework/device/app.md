
# Register for the Mini Program

Each Mini Program needs to use the `App` constructor Register for the Mini Program instance in `app.js`, bind the lifecycle callback function and mount properties on the instance.

app.js
```
App({  
  globalData: {  
    title: 'hello world!'  
  },  
  onCreate(options) {},  
  onDestroy(options) {},  
})  

```
## Get app instance[​](/docs/1.0/guides/framework/device/app/#get-app-instance "Direct link to Get app instance")

Use the `getApp` method to get an `app` instance

```
const globalData = getApp()._options.globalData  
  
// Modify data by assigning values  
globalData.title = 'hello Zepp OS!'  

```
