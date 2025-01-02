
# Quick Start

## Introduction[​](/docs/1.0/guides/quick-start/#introduction "Direct link to Introduction")

Zepp OS's open capabilities include Mini Program and Watchface.

The effect of running the Mini Program.

![mini_program_preview](/assets/images/mini_program_preview-94c49f656c2d4f04c4e4f822479935a9.gif)

The effect of running the Watchface.

![watchface_preview](/assets/images/watchface_preview-fb4c2508258307c6557805c95a30f9d1.gif)

Developers can experience more Mini Programs and Watchfaces in the "App Store" and "Watchfaces" in the Zepp App.

## Getting Started[​](/docs/1.0/guides/quick-start/#getting-started "Direct link to Getting Started")

Get started quickly with Zepp Mini Program and Watchface development with the guidance in this document.

### Apply for an account[​](/docs/1.0/guides/quick-start/#apply-for-an-account "Direct link to Apply for an account")

First you need a Zepp account, through which you can manage the Mini Program and Watchfaces.

Go to [Register Zepp Account](https://user.zepp.com/universalLogin/index.html#/register?project_name=open_platform&project_redirect_uri=https%3A%2F%2Fconsole.zepp.com%2F%23%2F&platform_app=com.huami.webapp), or use an existing Zepp account.

### Zepp Mobile App and Device Preparation[​](/docs/1.0/guides/quick-start/#zepp-mobile-app-and-device-preparation "Direct link to Zepp Mobile App and Device Preparation")

Go to the app market with your phone and install the latest version of the Zepp App.

* [Android Download](https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager&hl=en&gl=US)
* [IOS Download](https://apps.apple.com/us/app/zepp-formerly-amazfit/id1127269366)

Sign in to your Zepp account in the Zepp App and follow the instructions to complete the tethering of your Zepp OS equipped device.

### Create the first Watchface[​](/docs/1.0/guides/quick-start/#create-the-first-watchface "Direct link to Create the first Watchface")

We offer two ways to make Watchfaces.

The first one is to create a Watchface online in your browser via the [Watchface Maker](https://watchface.zepp.com/) (visual interactive interface).

![effects](/assets/images/overview-17b4e5c53baf19db5423ea17201b6865.png)

info

The Watchface Maker requires no programming experience and is designed to be very user-friendly in operation and interaction! For more usage refer to [Watchface Maker - Instructions](/docs/1.0/guides/tools/watchface/).

The second way is to create the Watchface project by way of the Zeus CLI (the same way as the Mini Program below, see [Create the first Mini Program](/docs/1.0/guides/quick-start/#create-the-first-mini-program))

### Create the first Mini Program[​](/docs/1.0/guides/quick-start/#create-the-first-mini-program "Direct link to Create the first Mini Program")

In this step, we make a series of configurations for the Mini Program development environment, install a series of development tools, and complete the creation of the first Mini Program.

tip

This process also applies to the Watchface Zeus CLI development approach.

#### Installing Node.js and the code editor[​](/docs/1.0/guides/quick-start/#installing-nodejs-and-the-code-editor "Direct link to Installing Node.js and the code editor")

Please refer to [Construction of basic environment](/docs/1.0/guides/best-practice/Basic-environment-construction/).

#### Installing the Zeus CLI[​](/docs/1.0/guides/quick-start/#installing-the-zeus-cli "Direct link to Installing the Zeus CLI")

Zeus CLI is a command line tool for quickly creating template projects using the `zeus create` command.

Please refer to [Zeus CLI](/docs/1.0/guides/tools/cli/) for installation.

#### Install the simulator[​](/docs/1.0/guides/quick-start/#install-the-simulator "Direct link to Install the simulator")

Zepp OS simulator can help developers simulate the running performance of Mini Programs. At the same time, you can view the log of the Mini Program, which is convenient for developers to debug and greatly improve the development efficiency.

![workspace.jpg](/assets/images/workspace-454d86b5be2da7aec9ac4f1c996a5aca.jpg)

Please refer to [Simulator Setup](/docs/1.0/guides/tools/simulator/setup/) for the installation procedure.

#### Creating Template Projects with the Zeus CLI[​](/docs/1.0/guides/quick-start/#creating-template-projects-with-the-zeus-cli "Direct link to Creating Template Projects with the Zeus CLI")

```
zeus create hello-world  

```

![CLI interaction](/assets/images/cli_interaction-4c8986f4aa88d27b3dbd8ab25d86a0c9.jpg)

Once the project is created, open the project with the code editor and you will see the template project code.

#### Compile Preview[​](/docs/1.0/guides/quick-start/#compile-preview "Direct link to Compile Preview")

Refer to [Simulator - Installation and launch](/docs/1.0/guides/tools/simulator/setup/) to install and launch the simulator.

```
cd /Applications/simulator.app/Contents/MacOS && sudo -s ./simulator  

```

info

The simulator communication depends on the virtual network interface card tun/tap, which requires sudo privileges to run, so you need to use the sudo command to run the simulator.

After starting the simulator, refer to [Simulator - Install and open "Device Simulator"](/docs/1.0/guides/tools/simulator/#install-and-open-device-simulator) to complete the installation and launch of "Device Simulator".

![download.jpg](/assets/images/download-a89e8a95295b6b508f34f563aba04033.jpg)

![device_simulator.jpg](/assets/images/device_simulator-955d90e65af9333dd1891ad1fd11f870.jpg)

Execute [`zeus dev` compile preview command](/docs/1.0/guides/tools/cli/#zeus-preview-compilation-preview-real-machine) at the root of the template project `hello-world` and the Zeus CLI will compile the project code and preview it through the simulator.

```
zeus dev  

```

You can preview `hello-world` Mini Program in the Device Simulator.

![hello world preview](/assets/images/hello_world-7901fbc86dbd7625e28412e4332857d5.jpg)

For a real machine preview, please refer to [Zeus CLI Real Machine Preview](/docs/1.0/guides/tools/cli/#zeus-preview-compile-preview-real-machine).

---

Congratulations 🎉🎉🎉🎉, you have successfully created your first Mini Program.

In addition to the template project, a series of sample Mini Programs and Watchfaces are available for developers to reference.

* [Sample Mini Programs and Watchfaces](/docs/1.0/samples/)

For more specific details on the framework and API, please refer to the corresponding reference documents.

* [Overall Architecture](/docs/1.0/guides/architecture/arc/)
* [Folder Structure](/docs/1.0/guides/architecture/folder-structure/)
* [Device App](/docs/1.0/guides/framework/device/intro/)
* [Mini Program Configuration app.json](/docs/1.0/reference/app-json/)

For more details on development and debugging, please refer to.

* [Debug Mini Program](/docs/1.0/guides/best-practice/debug/)

For more details on the release of Mini Programs and Watchfaces, please refer to.

* [How to submit an App](/docs/1.0/distribute/)
* [How to submit a Watchface](/docs/1.0/distribute/watchface/)
