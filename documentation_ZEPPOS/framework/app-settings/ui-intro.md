
# Introduction to the use of UI components

The return value of the `build` lifecycle is of type `RenderFunc` as mentioned above in the registration setup application.

UI components exist as functions whose types can be represented as follows, with some UI components supporting `renderFuncArr` subcomponents.

```
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc  

```

Please refer to [UI Components](/docs/1.0/reference/app-settings-api/ui/auth/)for details of usage.

Some of these components support passing in the `style` attribute, and support [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) related properties with names like [camelCase](https://en.wikipedia.org/wiki/Camel_case).

## Code example[​](/docs/1.0/guides/framework/app-settings/ui-intro/#code-example "Direct link to Code example")

```
AppSettingsPage({  
  build(props) {  
    return Button({  
      label: 'Delete',  
      style: {  
        fontSize: '12px',  
        borderRadius: '30px',  
        background: '#D85E33',  
        color: 'white'  
      },  
      onClick: () => {  
        // ...  
      }  
    })  
  }  
})  

```

```
AppSettingsPage({  
  build(props) {  
    return Section({}, [  
      Section(  
        {},  
        TextInput({  
          label: 'Name',  
        })  
      ),  
      Section(  
        {},  
        Button({  
          label: 'Start',  
          onClick() {  
            // ...  
          }  
        })  
      )  
    ])  
  }  
})  

```
