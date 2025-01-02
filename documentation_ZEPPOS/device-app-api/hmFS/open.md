
# hmFS.open(path, flag)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Open the file in the `/data` directory of the Mini Program.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/open/#type "Direct link to Type")

```
(path: string, flag: FLAG) => fileId  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/open/#parameters "Direct link to Parameters")

### path[​](/docs/1.0/reference/device-app-api/hmFS/open/#path "Direct link to path")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Mini Program `/data` directory file name (relative path) | yes | `string` | - |

### FLAG[​](/docs/1.0/reference/device-app-api/hmFS/open/#flag "Direct link to FLAG")

| Optional Properties | Description |
| --- | --- |
| O\_RDONLY | read-only |
| O\_WRONLY | write-only |
| O\_RDWR | read-write |
| O\_APPEND | Append mode on. |
| O\_CREAT | If file does not exist, create and open. |
| O\_EXCL | Used in conjunction with O\_CREAT. If it does not exist, create and open it, if it does exist, return an error. |
| O\_TRUNC | If the file exists, the length is truncated to 0. |

### fileId[​](/docs/1.0/reference/device-app-api/hmFS/open/#fileid "Direct link to fileId")

| Description | Type |
| --- | --- |
| file handle | `number` |

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/open/#usage "Direct link to Usage")

```
Page({  
  build() {  
    const fileId = hmFS.open('test_file.txt', hmFS.O_RDWR | hmFS.O_CREAT)  
  }  
})  

```
