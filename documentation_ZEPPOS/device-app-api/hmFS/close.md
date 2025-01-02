
# hmFS.close(fileId)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Close file handle.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/close/#type "Direct link to Type")

```
(fileId: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/close/#parameters "Direct link to Parameters")

### fileId[​](/docs/1.0/reference/device-app-api/hmFS/close/#fileid "Direct link to fileId")

| Description | Type |
| --- | --- |
| File handle, returned when the file is opened | `number` |

### result[​](/docs/1.0/reference/device-app-api/hmFS/close/#result "Direct link to result")

| Description | Type |
| --- | --- |
| result, `0` get success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/close/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const fileId = hmFS.open('test_file.txt', hmFS.O_RDWR | hmFS.O_CREAT)  
  
    hmFS.close(fileId)  
  }  
})  

```
