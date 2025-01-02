
# hmFS.stat\_asset(path)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Get information about the files in the Mini Program `/assets` directory.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#type "Direct link to Type")

```
(path: string) => [stat, err]  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#parameters "Direct link to Parameters")

### path[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#path "Direct link to path")

| Description | Required | Type | Default |
| --- | --- | --- | --- |
| Mini Program's `/assets` directory file name (relative path) | yes | `string` | - |

### stat[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#stat "Direct link to stat")

| Properties | Description | Type |
| --- | --- | --- |
| size | Number of bytes of the file | `number` |
| mtime | File last modified time in UTC seconds | `number` |

### err[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#err "Direct link to err")

| Description | Type |
| --- | --- |
| Error code, `0` means get success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Usage[​](/docs/1.0/reference/device-app-api/hmFS/stat_asset/#usage "Direct link to Usage")

```
Page({  
  build() {  
    const [fs_stat, err] = hmFS.stat_asset('raw/test_file.txt')  
  
    if (err === 0) {  
      const { size, mtime } = fs_stat  
  
      const text = hmUI.createWidget(hmUI.widget.TEXT, {  
        x: px(0),  
        y: px(120),  
        w: px(480),  
        h: px(46),  
        color: 0xffffff,  
        text_size: px(20),  
        align_h: hmUI.align.CENTER_H,  
        align_v: hmUI.align.CENTER_V,  
        text_style: hmUI.text_style.NONE,  
        text: `size: ${size}; mtime: ${mtime}`  
      })  
  
    } else {  
      console.log('err:', err)  
    }  
  }  
})  

```
