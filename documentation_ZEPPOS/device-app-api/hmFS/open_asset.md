
# hmFS.open\_asset(path, flag)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Open the files in the `/assets` directory of the Mini Program, the `/assets` directory is read-only.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#type "Direct link to Type")

```
(path: string, flag: FLAG) => fileId  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#parameters "Direct link to Parameters")

### path[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#path "Direct link to path")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Mini Program's `/assets` directory file name (relative path) | yes | `string` | - |

### FLAG[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#flag "Direct link to FLAG")

| Optional Properties | Description |
| --- | --- |
| O\_RDONLY | read-only |

### fileId[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#fileid "Direct link to fileId")

| Description | Type |
| --- | --- |
| file handle | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/open_asset/#code-example "Direct link to Code example")

```
Page({  
  build() {  
    const fileId = hmFS.open_asset('test_file.txt', hmFS.O_RDONLY)  
  }  
})  

```
