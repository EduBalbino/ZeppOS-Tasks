import { BaseAboutScreen } from "../../lib/mmk/BaseAboutScreen";
import { VERSION } from "../../version";

// Get global data with type assertions
const { t } = (getApp() as any)._options.globalData;

interface AboutScreenParams {
  [key: string]: any;
}

class AboutScreen extends BaseAboutScreen {
  constructor(params: string) {
    super();

    const parsedParams = JSON.parse(params) as AboutScreenParams;

    this.appId = 1023438;
    this.appName = "Tasks";
    this.version = VERSION;
    this.donateUrl = `page/amazfit/DonatePage`;
    this.donateText = t("Donate");

    this.iconSize = 100;
    this.iconFile = "icon_about.png";

    this.helpText = t("Help");
    this.helpUrl = "page/amazfit/MarkdownReader?param=index.md";

    this.infoRows = [
      ["melianmiko", "Developer"],
    ];

    this.uninstallText = t("Uninstall");
    this.uninstallConfirm = t("Tap again to confirm");
    this.uninstallResult = t("Uninstall complete");
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    hmUI.setStatusBarVisible(false);
    new AboutScreen(params).start();
  }
}) 