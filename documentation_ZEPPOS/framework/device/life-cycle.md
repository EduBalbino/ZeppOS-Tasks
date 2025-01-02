
# Life Cycle

As shown in the figure:

![life cycle](/assets/images/life-cycle-en-650352204bf69a5b53c96dca5ce8f636.jpg)

## Description[​](/docs/1.0/guides/framework/device/life-cycle/#description "Direct link to Description")

* App onCreate
  + Initialize the app global data for use by all pages. (Note: UI cannot be drawn here, no page is loaded yet)
  + Function signature `(param: string) => void`, where `param` is passed by the `param` parameter in `hmApp.startApp`
* Page onInit
  + Initialize page
  + Function signature `(param: string) => void`, where `param` is passed by the `param` parameter in `hmApp.gotoPage` or `hmApp.reloadPage`
* Page build
  + Draws the UI
  + Function signature `() => void`
* Page onDestroy
  + Destroy page
  + Function signature `() => void`
* App onDestroy
  + Destroy the app
  + Function signature `() => void`
