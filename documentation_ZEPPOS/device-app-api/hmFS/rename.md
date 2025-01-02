
# hmFS.rename(oldPath, newPath)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Rename the file in the `/data` data directory of the Mini Program.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/rename/#type "Direct link to Type")

```
(oldPath: string, newPath: string) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/rename/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| oldPath | old file path (relative path) | yes | `string` | - |
| newPath | new file path (relative path) | yes | `string` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/rename/#result "Direct link to result")

| Description | Type |
| --- | --- |
| The result of the operation, `0` means success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/rename/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const result = hmFS.rename('path/to/old_file.txt', 'path/to/new_file.txt')  
    console.log(result)  
  }  
})  

```
