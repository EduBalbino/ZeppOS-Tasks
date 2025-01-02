import { FontSizeSetupScreen } from "../../lib/mmk/FontSizeSetupScreen";

// Get global data with type assertions
const { config } = (getApp() as any)._options.globalData;

class ConfiguredFontSizeSetupScreen extends FontSizeSetupScreen {
  protected getSavedFontSize(fallback: number): number {
    return config.get("fontSize", fallback);
  }

  protected onChange(value: number): void {
    config.set("fontSize", value);
  }
}

// Page configuration
Page({
  onInit() {
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle("");

    new ConfiguredFontSizeSetupScreen().start();
  }
}) 