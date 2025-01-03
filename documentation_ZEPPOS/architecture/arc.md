
# Overall Architecture

![Architecture Diagram](/assets/images/architecture-ed17fb0378ae39302988f48e35d5e3e9.jpg)

A complete Zepp OS Mini Program is divided into two parts.

* Device App
* Side App (optional)
  + Settings App
  + Side Service

"Device apps" run on the device side (devices with Zepp OS) and have the ability to interact with UI, device sensor calls, etc.

"Side App" is a collective term for the "Settings App" and "Side Service" running on the Zepp App (usually a smartphone device, henceforth referred to as mobile).

The "Settings App" provides UI interaction capabilities on the mobile side, usually as a companion settings page to the "Device App".

"Side Service" have no UI interface and provide a range of data communication and network request capabilities.

The "Side App" is optional, i.e. some Mini Programs do not need to use the capabilities of the Side App and only run on the device side, such as a simple calculator app.

## Communication Relationships[​](/docs/1.0/guides/architecture/arc/#communication-relationships "Direct link to Communication Relationships")

* Communication between the Device Application and the Side Service via Bluetooth
* Communication between the Side Service and the Settings App via the Settings Storage API
  + Both the Side Service and the Settings App can access `settingsStorage` storage
  + The Side Service listens for `change` event via `settingsStorage` to respond to changes to `settingsStorage` data in the Settings App
  + The "Settings App" is naturally "responsive", eliminating the need to manually listen for data changes in `settingsStorage`.
* The Side Service communicates with the Server via the Fetch API

caution

Direct communication between "Device App" and "Settings App" is not possible and requires a "Side Service".


tip

* For a complete example of communication between "Device Application", "Side Service", and "Settings App", please refer to the sample [ToDoList](/docs/1.0/samples/app/toDoList/)
* For the communication between "Side Service" and "Server", please refer to the sample [FetchAPI](/docs/1.0/samples/app/fetchAPI/)
* [Bluetooth Communication](/docs/1.0/guides/best-practice/bluetooth-communication/)
