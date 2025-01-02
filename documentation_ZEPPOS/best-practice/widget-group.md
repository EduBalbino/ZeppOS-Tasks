# Widgets Management by Group

This article introduces the use of `GROUP` widget to group and manage a series of widgets in some suitable scenarios for a more elegant code implementation.

Examples are given for the following scenarios, and we look forward to more scenarios from the community:

* Scenario 1: Uniformly control the widgets in a rectangular area to show/hide, modify the position, etc.
* Scenario 2: Registering the same click events for widgets in a rectangular area and expanding the click area for user interaction

## Scenario 1: Uniformly control the widgets in a rectangular area to show/hide, modify the position, etc.

[IMAGE DESCRIPTION: The Holiday Calendar Mini Program interface shows a list of holidays. Each holiday entry contains an icon on the left, text in the middle showing the holiday name, and an arrow icon on the right indicating it's clickable.]

Let's examine one holiday entry component. This part of the screen includes:
- An icon image widget on the left
- A text widget in the middle showing the holiday name
- An arrow image widget on the right
If we wanted to hide this whole area, how would the code do it?

```js
const img_icon_widget = hmUI.createWidget(hmUI.widget.IMG, {
  // ...
})

const img_arrow_widget = hmUI.createWidget(hmUI.widget.IMG, {
  // ...
})

const text_name_widget = hmUI.createWidget(hmUI.widget.TEXT, {
  // ...
})

img_icon_widget.setProperty(hmUI.prop.VISIBLE, false)
img_arrow_widget.setProperty(hmUI.prop.VISIBLE, false)
text_name_widget.setProperty(hmUI.prop.VISIBLE, false)
```

Need to set property `hmUI.prop.VISIBLE` once for each widget in this area, this code is not well maintained, use `GROUP` widget to transform the code.

```js
const group_widget = hmUI.createWidget(hmUI.widget.GROUP , {
  // ...
})

const img_icon_widget = group_widget.createWidget(hmUI.widget.IMG, {
  // ...
})

const img_arrow_widget = group_widget.createWidget(hmUI.widget.IMG, {
  // ...
})

const text_name_widget = group_widget.createWidget(hmUI.widget.TEXT, {
  // ...
})

group_widget.setProperty(hmUI.prop.VISIBLE, false)
```

As you can see, all widgets created with `GROUP` are managed with `GROUP`, and the code is streamlined by unifying the control of showing and hiding with `GROUP` widget.

> **Caution**: Note that widgets created with `group.createWidget` are laid out using relative coordinates, with the origin of the layout coordinate system located in the upper-left corner of the `group` widget.

## Scenario 2: Register the same click events for controls in a rectangular area and expand the click area for user interaction

[IMAGE DESCRIPTION: The same holiday entry component is shown, but now with highlighted areas indicating clickable regions. Initially, only the individual widgets (icon, text, arrow) are clickable, showing small discrete clickable areas.]

Again, using this interface as an example, we want to trigger the function `callback` for each widget clicked in this area. Here's the typical implementation:

```js
const callback = () => {
  console.log('callback')
}

const img_icon_widget = hmUI.createWidget(hmUI.widget.IMG, {
  // ...
})

img_icon_widget.addEventListener(hmUI.event.CLICK_DOWN, callback)

const img_arrow_widget = hmUI.createWidget(hmUI.widget.IMG, {
  // ...
})

img_arrow_widget.addEventListener(hmUI.event.CLICK_DOWN, callback)

const text_name_widget = hmUI.createWidget(hmUI.widget.TEXT, {
  // ...
})

text_name_widget.addEventListener(hmUI.event.CLICK_DOWN, callback)
```

[IMAGE DESCRIPTION: The same component is shown with small highlighted areas over each widget, illustrating the limited clickable regions that make it difficult to interact with on a small watch screen.]

As you can observe, the interactable area is too narrow and hard to click on the watch device, resulting in a poor user experience. Here's the improved version using the `GROUP` widget:

```js
const callback = () => {
  console.log('callback')
}

const group_widget = hmUI.createWidget(hmUI.widget.GROUP , {
  // ...
})

const img_icon_widget = group_widget.createWidget(hmUI.widget.IMG, {
  // ...
})

const img_arrow_widget = group_widget.createWidget(hmUI.widget.IMG, {
  // ...
})

const text_name_widget = group_widget.createWidget(hmUI.widget.TEXT, {
  // ...
})

group_widget.addEventListener(hmUI.event.CLICK_DOWN, callback)
```

[IMAGE DESCRIPTION: The final view shows the entire holiday entry area highlighted, indicating that the whole rectangular region is now clickable, providing a much larger and more user-friendly touch target.]

Only need to register the event once and you can observe that the clickable area now covers the entire group region, making it much easier for users to interact with on a watch screen!