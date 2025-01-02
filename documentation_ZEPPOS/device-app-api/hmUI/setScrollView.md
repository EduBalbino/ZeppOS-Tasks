
# hmUI.setScrollView(enable, pageHeight, pageCount, isVertical)

![scroll_view](/assets/images/scroll_view-0c26aa8ddfc83ddde51eaf9865d34437.gif)

![scroll_view](/assets/images/scroll_view_horizon-1d1d3fd92325a174298724ed0b37269b.gif)

Set the entire page to Swipe mode, which can support vertical and horizontal scrolling.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/setScrollView/#type "Direct link to Type")

```
(enable: boolean, pageHeight: number, pageCount: number, isVertical: boolean) => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/setScrollView/#parameters "Direct link to Parameters")

| Parameter | Description | Type |
| --- | --- | --- |
| enable | `true`: set the page scrolling mode to Swipe mode, `false`: regular scrolling mode. | `boolean` |
| pageHeight | When `enable` is `true`, the parameter is required. The length of each page. | `number` |
| pageCount | If `enable` is `true`, the parameter is required. How many pages are available. | `number` |
| isVertical | `true` for vertical scrolling, `false` for horizontal scrolling, default is `true` | `boolean` |

### result[​](/docs/1.0/reference/device-app-api/hmUI/setScrollView/#result "Direct link to result")

| Description | Type |
| --- | --- |
| result, `true` means set successfully. | `boolean` |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/setScrollView/#code-example "Direct link to Code example")

```
const randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']  
  
function getRandomFromSection(low, high) {  
  const RANDOM = Math.random()  
  const RANGE = high - low + 1  
  
  return Math.floor(RANDOM * RANGE) + low  
}  
  
Page({  
  build() {  
    const isVertical = true  
    hmUI.setScrollView(true, px(480), 20, isVertical)  
  
    const numArr = Array.from({ length: 20 }).map((_, index) => index)  
  
    numArr.forEach((num) => {  
      const backgroundColor = Array.from({ length: 6 }).reduce((prev, curr) => {  
        const random = getRandomFromSection(0, 15)  
        return prev + randomArr[random]  
      }, '0x')  
  
      hmUI.createWidget(hmUI.widget.FILL_RECT, {  
        x: 0,  
        y: px(480) * num,  
        w: px(480),  
        h: px(480),  
        color: Number(backgroundColor)  
      })  
  
      const text = hmUI.createWidget(hmUI.widget.TEXT, {  
        x: px(96),  
        y: px(200) + px(480) * num,  
        w: px(320),  
        h: px(46),  
        color: 0xffffff,  
        text_size: px(36),  
        align_h: hmUI.align.CENTER_H,  
        align_v: hmUI.align.CENTER_V,  
        text_style: hmUI.text_style.NONE,  
        text: `HELLO ZEPPOS ${num}`  
      })  
    })  
  }  
})  

```
