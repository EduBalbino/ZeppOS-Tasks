
# hmFS.read(fileId, buffer, position, length)

> For an introduction to the Zepp OS Mini Program file system, please refer to [File System](/docs/1.0/guides/framework/device/fs/).

Reads data from the file that in the given buffer.

## Type[​](/docs/1.0/reference/device-app-api/hmFS/read/#type "Direct link to Type")

```
(fileId: number, buffer: ArrayBuffer, position: number, length: number) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmFS/read/#parameters "Direct link to Parameters")

| Parameters | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| fileId | file handle | yes | `number` | - |
| buffer | The buffer that will be filled with the read file data | yes | `ArrayBuffer` | - |
| position | Offset based on `buff` first address | yes | `number` | - |
| length | the number of bytes to read | yes | `number` | - |

### result[​](/docs/1.0/reference/device-app-api/hmFS/read/#result "Direct link to result")

| Parameters | Description | Type |
| --- | --- | --- |
| result | The result of the operation, `0` means success | `number` |

Please refer to [File System - Error Code](/docs/1.0/guides/framework/device/fs/#error-code) for the rest of the error codes.

## Code example[​](/docs/1.0/reference/device-app-api/hmFS/read/#code-example "Direct link to Code example")

```
const test_buf = new Uint8Array(10)  
const test_buf2 = new Uint8Array(test_buf.length)  
  
const file = hmFS.open('test_file.txt', hmFS.O_RDWR | hmFS.O_CREAT)  
hmFS.read(file, test_buf2.buffer, 0, test_buf2.length)  

```
