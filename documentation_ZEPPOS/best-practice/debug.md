
# Debug Mini Program

## Introduction[​](/docs/1.0/guides/best-practice/debug/#introduction "Direct link to Introduction")

At this stage Zepp OS development tools do not support breakpoint debugging code, adding logging is the best debugging tool.

This article will cover the following.

* Adding logs in the Mini Program
* Simulator to view logs
* Viewing the real machine logs

## Add logs in the Mini Program[​](/docs/1.0/guides/best-practice/debug/#add-logs-in-the-mini-program "Direct link to Add logs in the Mini Program")

The [Overall Architecture](/docs/1.0/guides/architecture/arc/), you can understand that a complete Zepp OS Mini Program is divided into "Device App", "Settings App" and "Side Service".

They have a slightly different way of adding logs to the code.

For "Device App", we recommend using `HmLogger` on `DeviceRuntimeCore`.

And you can print different levels of logs by different methods to facilitate filtering logs.

```
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')  
  
Page({  
  build() {  
    logger.log('page build invoked')  
  },  
  onInit() {  
    logger.error('page onInit invoked')  
  },  
  
  onDestroy() {  
    logger.warn('page onDestroy invoked')  
  },  
})  

```

For "Settings App" and "Side Service", you can use `console.log` to print the logs as described in the framework interface.

## View Simulator Log[​](/docs/1.0/guides/best-practice/debug/#view-simulator-log "Direct link to View Simulator Log")

Take the effect of the [TodoList](/docs/1.0/samples/app/toDoList/) Mini Program running on the simulator as an example.

![desk.png](/assets/images/workspace-454d86b5be2da7aec9ac4f1c996a5aca.jpg)

### Device App Log[​](/docs/1.0/guides/best-practice/debug/#device-app-log "Direct link to Device App Log")

In the main screen of the simulator, click the `Console` button on the left side to see the "Device App" log.

![device_log](/assets/images/device_log-1b97d0580942f6d1bbfd07f0ae22789b.jpg)

Different levels of logs are displayed with clear color distinction, the upper right corner can be quickly filtered according to the log level, and a string filtering rule function is also provided.

### Settings App Log[​](/docs/1.0/guides/best-practice/debug/#settings-app-log "Direct link to Settings App Log")

The console next to the "Settings App" simulator makes it easy to see the relevant logs, which also provide filtering capabilities.

![settings_log](/assets/images/settings_log-548b0d40eb3539b38c3b6c5a1f18f838.jpg)

### Side Service Log[​](/docs/1.0/guides/best-practice/debug/#side-service-log "Direct link to Side Service Log")

The Side Service log window is launched along with the Device Simulator and also has a log filtering function.

![side_service_log](/assets/images/side_service_log-ef74bfb4193004292db84a9fd142301c.jpg)

## Real Machine Log[​](/docs/1.0/guides/best-practice/debug/#real-machine-log "Direct link to Real Machine Log")

The real machine logs need to be viewed using the developer mode of the Zepp App, refer to.

* [Open Zepp App Developer Mode](/docs/1.0/guides/tools/zepp-app/#developer-mode-opening-method)
* [Zepp App View real machine logs](/docs/1.0/guides/tools/zepp-app/#view-real-machine-logs)
