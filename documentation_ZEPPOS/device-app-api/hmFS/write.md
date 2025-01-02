
# hmFS.write(fileId, buffer, position, length)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Write buffer to the file.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/write/#type "Direct link to Type")

```
(fileId: number, buffer: ArrayBuffer, position: number, length: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/write/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| fileId | file handle | yes | `number` | - |
| buffer | The buffer that will be filled with the read file data | yes | `ArrayBuffer` | - |
| position | Offset based on `buffer` first address | yes | `number` | - |
| length | the number of bytes to write | yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/write/#result "Direct link to result")

| Parameters | Description | Type |
| --- | --- | --- |
| result | The result of the operation, `0` means success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/write/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const test_buf = new Uint8Array(10)  
    const test_buf2 = new Uint8Array(test_buf.length)  
  
    const file = hmFS.open('test_file.txt', hmFS.O_RDWR | hmFS.O_CREAT)  
    hmFS.write(file, test_buf.buffer, 0, test_buf.length)  
  }  
})  

```
