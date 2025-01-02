
# hmFS.seek(fileId, position, whence)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Move file pointer.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/seek/#type "Direct link to Type")

```
(fileId: number, position: number, whence: number) => void  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/seek/#parameters "Direct link to Parameters")

| Parameter | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| fileId | file handle | yes | `number` | - |
| position | Offset based on `whence` | yes | `number` | - |
| whence | file location | yes | `number` | - |

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/seek/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const fileId = hmFS.open('test_file.txt', hmFS.O_RDWR | hmFS.O_CREAT)  
  
    hmFS.seek(file, 0, hmFS.SEEK_SET)  
  }  
})  

```
