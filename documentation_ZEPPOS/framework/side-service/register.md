
# Register for Side Service

The companion service needs to register an instance using the `AppSideService` constructor and bind the lifecycle callback function.

lifecycle

index.js
```
AppSideService({  
  onInit() {  
    // ...  
  },  
  onRun() {  
    // ...  
  },  
  onDestroy() {  
    // ...  
  },  
})  

```
