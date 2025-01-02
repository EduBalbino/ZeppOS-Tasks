
# MessageBuilder Bluetooth Communication

First, let's review the [Overall Architecture](/docs/1.0/guides/architecture/arc/) of the Zepp OS Mini Program.

Communication between "Device App" and "Side Service" is carried out via Bluetooth.

The "Device App" uses Bluetooth capabilities through the `hmBle` API and the "Side Service" uses Bluetooth capabilities through the `Messaging API`, both of which can currently only manipulate binary data and are cumbersome for developers to organize data structures.

Refer to the sample [ToDoList](/docs/1.0/samples/app/toDoList/), where `/shared/message.js` wraps `hmBle` and `Messaging API` to make it easier for developers to develop applications.

This article shares the experience of using `MessageBuilder`, i.e. `message.js`, to complete the communication between "Device App" and "Side Service"

## Usage[​](/docs/1.0/guides/best-practice/bluetooth-communication/#usage "Direct link to Usage")

### 1. Environmental Preparation[​](/docs/1.0/guides/best-practice/bluetooth-communication/#1-environmental-preparation "Direct link to 1. Environmental Preparation")

`/shared/message.js` relies on a lot of methods that the host environment does not have, so you need to polyfill the environment. All the files in the `/shared` directory will be used, and are imported in app.js

```
import './shared/device-polyfill'  

```
### 2. Establish connection[​](/docs/1.0/guides/best-practice/bluetooth-communication/#2-establish-connection "Direct link to 2. Establish connection")

Instantiate `MessageBuilder` in `Device App` and `Side Service` respectively, and perform Bluetooth channel connection establishment in their respective lifecycles.

caution

In the `onDestroy` lifecycle of "Device App", connection destruction is required to prevent memory leaks.


```
import './shared/device-polyfill'  
import { MessageBuilder } from './shared/message'  
  
// need to pass in the appId  
const appId = 27280  
const messageBuilder = new MessageBuilder({ appId })  
  
App({  
  globalData: {  
    messageBuilder: messageBuilder,  
  },  
  onCreate(options) {  
    console.log('app on create invoke')  
    // establish connection  
    messageBuilder.connect()  
  },  
  
  onDestroy(options) {  
    console.log('app on destroy invoke')  
    messageBuilder.disConnect()  
  }  
})  

```

```
import { MessageBuilder } from '../shared/message'  
  
const messageBuilder = new MessageBuilder()  
  
AppSideService({  
  onInit() {  
    // establish connection  
    messageBuilder.listen(() => {})  
  },  
})  

```
### 3. Event-based communication[​](/docs/1.0/guides/best-practice/bluetooth-communication/#3-event-based-communication "Direct link to 3. Event-based communication")

After the connection is established, subsequent communication is based on the event mechanism, with listening and dispatching methods on both ends, just refer to the code example.

```
const { messageBuilder } = getApp()._options.globalData  
const logger = DeviceRuntimeCore.HmLogger.getLogger('demo')  
  
Page({  
  build() {  
    // receive a message from the Side Service  
    messageBuilder.on('call', ({ payload: buf }) => {  
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object  
      const data = messageBuilder.buf2Json(buf)  
      logger.log('data', data)  
    })  
  
    // send a message to Side Service  
    messageBuilder.request({  
      method: 'GET',  
      params: {  
        index: 0  
      }  
    }).then(data => {  
      // process Side Service responses  
      const { result } = data  
      logger.log(result)  
    })  
  }  
})  

```

```
import { MessageBuilder } from '../shared/message'  
  
const messageBuilder = new MessageBuilder()  
  
AppSideService({  
  onInit() {  
    messageBuilder.listen(() => {})  
  
    // send a message to Device App  
    messageBuilder.call({ text: 'Hello Zepp OS' })  
  
    // receive a message from Device App  
    messageBuilder.on('request', (ctx) => {  
      const payload = messageBuilder.buf2Json(ctx.request.payload)  
      const { method, params } = payload  
  
      if (method === 'GET') {  
        ctx.response({  
          data: { result : 0 }  
        })  
      }  
    })  
  },  
})  

```
