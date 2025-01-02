
# hmFS.remove(path)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Delete the file in the `/data` data directory of the Mini Program.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/remove/#type "Direct link to Type")

```
(path: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/remove/#parameters "Direct link to Parameters")

### path[​](/docs/1.0/reference/device-app-api/hmFS/remove/#path "Direct link to path")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Mini Program `/data` directory file name (relative path) | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/remove/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/remove/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const result = hmFS.remove('path/to/test_file.txt')  
    console.log(result)  
  }  
})  

```
