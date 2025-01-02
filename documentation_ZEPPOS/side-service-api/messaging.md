
# Messaging API

The "Side Service" uses the Zepp Bluetooth communication capability through the `Messaging API` module to communicate with the "Device App".

> Currently, only binary data is supported, and developers need to convert the data structure themselves.

tip

For a complete example of Bluetooth communication, please refer to [Bluetooth Communication](/docs/1.0/guides/best-practice/bluetooth-communication/)

## addListener[​](/docs/1.0/reference/side-service-api/messaging/#addlistener "Direct link to addListener")

Listening to messages

### Code example[​](/docs/1.0/reference/side-service-api/messaging/#code-example "Direct link to Code example")

```
messaging.peerSocket.addListener('message', (payload) => {  
  // The Buffer here is polyfill.  
  const message = JSON.parse(Buffer.from(payload).toString('utf-8'))  
  
  if (message.type === 'command') {  
    switch (message.name) {  
      case GET_NOTE_LIST:  
        const notes = settings.settingsStorage.getItem('notes')  
        const noteBuffer = Buffer.from(notes)  
        messaging.peerSocket.send(noteBuffer.buffer)  
        break  
    }  
  }  
})  

```
## send[​](/docs/1.0/reference/side-service-api/messaging/#send "Direct link to send")

After establishing a connection, send a message.

### Code example[​](/docs/1.0/reference/side-service-api/messaging/#code-example-1 "Direct link to Code example")

```
if (key === 'notes') {  
  const notes = settings.settingsStorage.getItem('notes')  
  const noteBuffer = Buffer.from(notes)  
  messaging.peerSocket.send(noteBuffer.buffer)  
}  

```
