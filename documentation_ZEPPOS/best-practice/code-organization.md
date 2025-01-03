
# Code Organization

In order to improve development efficiency and project maintainability, a better way of organizing code is needed, and this article only provides an idea.

## Principles[​](/docs/1.0/guides/best-practice/code-organization/#principles "Direct link to Principles")

**Separation of structure, style and behavior, each in its own way**

Take a functional page `page.js` as an example, we can completely put the UI structure, style description, and behavior (JS logic) of the page in one file, and a simple page may only have one or two hundred lines without much problem.

When it comes to complex UI or complex logic, stacking all three together will result in too many lines of code, poor readability, and poor maintainability with a mix of relatively independent logic.

It is recommended to continue to do some fine-grained splitting of a `page.js`, splitting style descriptions into `page.styles.js`, organizing highly coupled variables and logic into `class.js` using object-oriented forms, and `page.js` only doing UI rendering and event dispatching.

## How to improve development efficiency[​](/docs/1.0/guides/best-practice/code-organization/#how-to-improve-development-efficiency "Direct link to How to improve development efficiency")

Under the existing development process, each code change needs to be previewed in the simulator or on the real machine, which is a time-consuming process. However, the pure JavaScript part of the Mini Program is not dependent on the runtime environment, and this part of the code can be developed by running it on a testing framework, such as [Jest](https://jestjs.io/).

The `class.js` (logic-related classes) in our code and the tool functions in the `/utils` directory can be run in the test framework, which saves a lot of time when writing pure JavaScript parts without relying on an simulator or a real machine, and allows us to debug the code in the test framework, thus improving development efficiency.

While the test framework brings convenience, it also places higher requirements on the "testability" of our code, such as using as many "pure functions" as possible for tool functions.

## Example[​](/docs/1.0/guides/best-practice/code-organization/#example "Direct link to Example")

A complete look at an example

page.js
```
import { TEXT_STYLE } from './page.styles.js'  
import TextClass from './text.class.js'  
  
Page({  
  state: {  
    textInstance: null  
  },  
  build() {  
    this.state.textInstance = new TextClass()  
    this.buildUI()  
  },  
  buildUI() {  
    hmUI.createWidget(hmUI.widget.TEXT, {  
      attr: {  
        text: this.state.textInstance.getText()  
      },  
      styles: TEXT_STYLE  
    })  
  }  
})  

```

class.js
```
export default class TextClass {  
  constructor() {  
    this.text = 'Hello World'  
  }  
  getText() {  
    return this.text  
  }  
}  

```

page.styles.js
```
export const TEXT_STYLE = {  
  x: px(96),  
  y: px(40),  
  w: px(288),  
  h: px(46),  
  color: 0xffffff,  
  text_size: px(36),  
  align_h: h.ALIGN.CENTER_H,  
  align_v: h.ALIGN.CENTER_V,  
  text_style: hmUI.text_style.WRAP  
}  

```
