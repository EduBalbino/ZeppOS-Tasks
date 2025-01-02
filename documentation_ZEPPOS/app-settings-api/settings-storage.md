
# Settings Storage API

The settingsStorage API can store data persistently in the Zepp App.

tip

Both the "Side Service" and the "Settings App" can access the data stored via `settingsStorage`.

The event system of `settingsStorage` can be used to communicate between the two ends.

For the communication method, please refer to the [Overall Architecture](/docs/1.0/guides/architecture/arc/)

## setItem[​](/docs/1.0/reference/app-settings-api/settings-storage/#setitem "Direct link to setItem")

Storing key-value pairs.

### Type[​](/docs/1.0/reference/app-settings-api/settings-storage/#type "Direct link to Type")

```
(key: string, value: string) => void  

```
## getItem[​](/docs/1.0/reference/app-settings-api/settings-storage/#getitem "Direct link to getItem")

Get the stored value by key name.

### Type[​](/docs/1.0/reference/app-settings-api/settings-storage/#type-1 "Direct link to Type")

```
(key: string) => result: string  

```
### Code example[​](/docs/1.0/reference/app-settings-api/settings-storage/#code-example "Direct link to Code example")

```
settings.settingsStorage.setItem('key', 'Hello World')  
const result = settings.settingsStorage.getItem('key')  

```
## length: number[​](/docs/1.0/reference/app-settings-api/settings-storage/#length-number "Direct link to length: number")

`settings.settingsStorage.length` returns the number of members in `settingsStorage`

## removeItem[​](/docs/1.0/reference/app-settings-api/settings-storage/#removeitem "Direct link to removeItem")

Delete the value stored by the key name.

### Type[​](/docs/1.0/reference/app-settings-api/settings-storage/#type-2 "Direct link to Type")

```
(key: string) => void  

```
## clear[​](/docs/1.0/reference/app-settings-api/settings-storage/#clear "Direct link to clear")

Delete all key-value pairs.

```
() => void  

```
## toObject[​](/docs/1.0/reference/app-settings-api/settings-storage/#toobject "Direct link to toObject")

Converts the content stored in `settingsStorage` to the form of an object.

### Type[​](/docs/1.0/reference/app-settings-api/settings-storage/#type-3 "Direct link to Type")

```
() => Record<string, any>  

```
### Code example[​](/docs/1.0/reference/app-settings-api/settings-storage/#code-example-1 "Direct link to Code example")

```
const storageObj = settings.settingsStorage.toObject()  
  
console.log(storageObj)  

```
## addListener[​](/docs/1.0/reference/app-settings-api/settings-storage/#addlistener "Direct link to addListener")

caution

This API only needs to be used in the Side Service. The Settings App is "responsive" to data changes in `settingsStorage`, so there is no need to manually listen for data changes.

Listens for changes to storage, with the agreed event name `change`, and can be used in the Side Service to listen for changes to data in `settingsStorage` by the Settings App.

### Code example[​](/docs/1.0/reference/app-settings-api/settings-storage/#code-example-2 "Direct link to Code example")

```
settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {  
  if (key === 'token' && newValue) {  
    // ...  
    await reLogin()  
  }  
})  

```
