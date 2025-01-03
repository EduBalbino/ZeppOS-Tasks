
# Data Persistence

## Introduction[​](/docs/1.0/guides/best-practice/persistence-storage/#introduction "Direct link to Introduction")

In some cases, we want to be able to store a part of the data state of an Mini Program persistently.

In simple terms, persistence means saving data to a storage device that can be saved permanently. Take a look at a practical Mini Program with an example.

The sample Mini Program [calories](/docs/1.0/samples/app/calories/) reads the consumption of the day and calculates the relationship between the calorie value and different foods, providing 10 foods for the user to choose from, with chocolate as the default. If the user wants to change to a burger, he needs to go to the selection page. Assuming that the program is not persistent, when the user exits the Mini Program and enters the Mini Program again, the food selected will still be chocolate. If persistence is done, then each time the Mini Program is entered, the previously saved application state is fetched and the selected food becomes a burger.

## Thinking[​](/docs/1.0/guides/best-practice/persistence-storage/#thinking "Direct link to Thinking")

Currently, if you want to implement persistence in an Mini Program, you need to use the `hmFS` API.

This article provides an idea to implement the `LocalStorage` utility class to encapsulate a series of file operations, which can easily read and write to a standard `JSON` object.

storage.js
```
function str2ab(str) {  
  const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char  
  const bufView = new Uint16Array(buf)  
  for (let i = 0, strLen = str.length; i < strLen; i++) {  
    bufView[i] = str.charCodeAt(i)  
  }  
  return buf  
}  
  
export default class LocalStorage {  
  constructor (fileName = '') {  
    this.fileName = fileName  
    this.contentObj = {}  
  }  
  
  set(obj) {  
    const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC)  
    const contentBuffer = str2ab(JSON.stringify(obj))  
  
    hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength)  
    hmFS.close(file)  
  }  
  
  get() {  
    const [fsStat, err] = hmFS.stat(this.fileName)  
    if (err === 0) {  
      const { size } = fsStat  
      const fileContentUnit = new Uint16Array(new ArrayBuffer(size))  
      const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT)  
      hmFS.seek(file, 0, hmFS.SEEK_SET)  
      hmFS.read(file, fileContentUnit.buffer, 0, size)  
      hmFS.close(file)  
  
      try {  
        const val = String.fromCharCode.apply(null, fileContentUnit)  
        this.contentObj = val ? JSON.parse(val) : {}  
      } catch (error) {  
        this.contentObj = {}  
      }  
    }  
  
    return this.contentObj  
  }  
}  

```

page.js
```
import LocalStorage from './storage'  
  
const localStorage = new LocalStorage('local_storage.txt')  
  
Page({  
  state: {  
    data: null  
  },  
  build() {  
    this.state.data = localStorage.get()  
    // ...  
  },  
  onDestroy() {  
    localStorage.set(this.state.data)  
  }  
})  

```
