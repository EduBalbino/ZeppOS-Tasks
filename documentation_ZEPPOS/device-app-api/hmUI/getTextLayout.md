
# getTextLayout(text\_string, options)

Calculate the height and width of the target text after the layout is completed, and does not actually render it, only performs the layout calculation.

Can be used to calculate the height of a multi-line text layout with a fixed width, or the width of a single-line text layout.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/getTextLayout/#type "Direct link to Type")

```
(text_string: string, options: object) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/getTextLayout/#parameters "Direct link to Parameters")

| Parameter | Description | Required | Type |
| --- | --- | --- | --- |
| text\_string | Text content of the layout to be calculated | YES | `string` |
| options | Options | YES | `Options` |

### Options[​](/docs/1.0/reference/device-app-api/hmUI/getTextLayout/#options "Direct link to Options")

| Properties | Description | Required | Type |
| --- | --- | --- | --- |
| text\_size | Text size | YES | `number` |
| text\_width | Width of a single line of text | YES | `number` |
| wrapped | whether the text is line feed, `0`: no line feed; `1`: line feed | NO | `number` |

### result: object[​](/docs/1.0/reference/device-app-api/hmUI/getTextLayout/#result-object "Direct link to result: object")

| Properties | Description | Type |
| --- | --- | --- |
| width | Width pixel value | `number` |
| height | Height pixel value | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/getTextLayout/#code-example "Direct link to Code example")

```
const { width, height } = hmUI.getTextLayout('turn right and go alone the road', {  
  text_size: 30,  
  text_width: 200  
})  
  
console.log('width', width)  
console.log('height', height)  

```

```
const { width, height } = hmUI.getTextLayout('turn right and go alone the road', {  
  text_size: 30,  
  text_width: 0,  
  wrapped: 0  
})  
  
console.log('width', width)  
console.log('height', height)  

```
