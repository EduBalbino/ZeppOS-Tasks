
# hmBle

The "Device App" communicates with the "Side Service" through the `hmBle` module using the device's Bluetooth communication capabilities.

tip

For a complete example of Bluetooth communication, please refer to [Bluetooth Communication](/docs/1.0/guides/best-practice/bluetooth-communication/)

## Method[​](/docs/1.0/reference/device-app-api/hmBle/#method "Direct link to Method")

### createConnect(callback)[​](/docs/1.0/reference/device-app-api/hmBle/#createconnectcallback "Direct link to createConnect(callback)")

Create connection

#### Type[​](/docs/1.0/reference/device-app-api/hmBle/#type "Direct link to Type")

```
(callback: (index: number, data: object, size: number) => void) => void  

```
#### Parameters[​](/docs/1.0/reference/device-app-api/hmBle/#parameters "Direct link to Parameters")

| Callback parameter | Description | Required | Type |
| --- | --- | --- | --- |
| index | subpackage number | NO | `number` |
| data | received data | NO | `object` |
| size | length of data received | NO | `number` |

### disConnect()[​](/docs/1.0/reference/device-app-api/hmBle/#disconnect "Direct link to disConnect()")

Disconnects

#### Type[​](/docs/1.0/reference/device-app-api/hmBle/#type-1 "Direct link to Type")

```
() => void  

```
### send(data, size)[​](/docs/1.0/reference/device-app-api/hmBle/#senddata-size "Direct link to send(data, size)")

Send a message

#### Type[​](/docs/1.0/reference/device-app-api/hmBle/#type-2 "Direct link to Type")

```
(data: object, size: number) => void  

```
#### Parameters[​](/docs/1.0/reference/device-app-api/hmBle/#parameters-1 "Direct link to Parameters")

| Parameters | Description | Required | Type |
| --- | --- | --- | --- |
| data | data to be sent | NO | `object` |
| size | length of data to be sent | NO | `number` |

### connectStatus()[​](/docs/1.0/reference/device-app-api/hmBle/#connectstatus "Direct link to connectStatus()")

Query connection status

#### Type[​](/docs/1.0/reference/device-app-api/hmBle/#type-3 "Direct link to Type")

```
() => Result  

```
#### Result[​](/docs/1.0/reference/device-app-api/hmBle/#result "Direct link to Result")

| Description | Type |
| --- | --- |
| connection status `true` connected, `false` not connected | `boolean` |

### addListener(callback)[​](/docs/1.0/reference/device-app-api/hmBle/#addlistenercallback "Direct link to addListener(callback)")

Register a connection status listener

#### type[​](/docs/1.0/reference/device-app-api/hmBle/#type-4 "Direct link to type")

```
(callback: (status: boolean) => void) => void  

```
#### Parameters[​](/docs/1.0/reference/device-app-api/hmBle/#parameters-2 "Direct link to Parameters")

| Callback parameter | Description | Type |
| --- | --- | --- |
| status | connection status | `boolean` |

### removeListener[​](/docs/1.0/reference/device-app-api/hmBle/#removelistener "Direct link to removeListener")

Cancel the connection status listener

#### type[​](/docs/1.0/reference/device-app-api/hmBle/#type-5 "Direct link to type")

```
() => void  

```
## Code example[​](/docs/1.0/reference/device-app-api/hmBle/#code-example "Direct link to Code example")

```
// Create Connection  
hmBle.createConnect(function (index, data, size) {  
  // Receive message callback, return the received message as it is  
  hmBle.send(data, size)  
})  
  
// Disconnection  
hmBle.disConnect()  
  
// Print Bluetooth connection status  
console.log(hmBle.connectStatus())  
  
// Register to listen for connection status  
hmBle.addListener(function (status) {  
  // Print connection status  
  console.log(status)  
})  

```
