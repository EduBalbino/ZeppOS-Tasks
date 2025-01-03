
# Cross-Page Communications

When a Mini Program has more than one page, how should the pages communicate with each other?

This article gives some solution ideas for some common scenarios.

* Page jumping
* Communication through the global `app` object

## Page Jumping[​](/docs/1.0/guides/best-practice/cross-page-communications/#page-jumping "Direct link to Page Jumping")

When jumping from `pageA.js` page to `pageB.js` page, use the `hmApp.gotoPage()` API to pass parameters to the `pageB.js` page via the `param` parameter

```
hmApp.gotoPage({  
  url: 'path/to/pageB',  
  param: JSON.stringify({  
    id: '0',  
    type: 'normal'  
  })  
})  

```

```
Page({  
  onInit(params) {  
    const paramsObj = JSON.parse(params)  
    const { id, type } = paramsObj  
    console.log(id === '0') // true  
    console.log(type === 'normal') // true  
  }  
})  

```

This solution can only be used for one-way passing of page jumps, if you do some operations in `pageB.js` and then return to the `pageA.js` page, calling the `hmApp.goBack` API does not support parameter passing, in this case you need to use the global `app` object to communicate

## Communicating through the global `app` object[​](/docs/1.0/guides/best-practice/cross-page-communications/#communicating-through-the-global-app-object "Direct link to communicating-through-the-global-app-object")

In the `app.js` constructor parameter, pass in the `globalData` object

```
App({  
  globalData: {  
    type: 'normal'  
  }  
})  

```

```
Page({  
  build() {  
    console.log(getApp()._options.globalData.type)  
  }  
})  

```

```
// ...  
getApp()._options.globalData.type = 'classic'  
  
hmApp.goBack()  

```

Our page jump is still from `PageA.js` to `PageB.js`

The `globalData` object mounted on the global `app` object is modified in `pageB.js`, and when we call `hmApp.goBack()` to return from the `pageB.js` page to the `pageA.js` page, we can get the modified `type` value

