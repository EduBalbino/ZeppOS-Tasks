
# hmUI.getScrollCurrentPage()

After setting the page to Swipe mode with `hmUI.setScrollView`, use `hmUI.getScrollCurrentPage` to get the number of pages currently located.

## Type[​](/docs/1.0/reference/device-app-api/hmUI/getScrollCurrentPage/#type "Direct link to Type")

```
() => result  

```
## Parameters[​](/docs/1.0/reference/device-app-api/hmUI/getScrollCurrentPage/#parameters "Direct link to Parameters")

### result[​](/docs/1.0/reference/device-app-api/hmUI/getScrollCurrentPage/#result "Direct link to result")

| Description | Type |
| --- | --- |
| Returns `undefined` when the page is in regular scrolling mode, otherwise returns the number of pages in the current rotation, starting from `1`. | `undefined |

## Code example[​](/docs/1.0/reference/device-app-api/hmUI/getScrollCurrentPage/#code-example "Direct link to Code example")

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
  
      text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {  
        const currentIndex = hmUI.getScrollCurrentPage()  
        console.log('currentIndex', currentIndex)  
      })  
    })  
  }  
})  

```
