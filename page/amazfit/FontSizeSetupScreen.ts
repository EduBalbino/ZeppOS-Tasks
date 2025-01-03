import { ListScreen } from "../../lib/mmk/ListScreen";
import { BASE_FONT_SIZE } from "../../lib/mmk/UiParams";

const { config } = getApp()._options.globalData;

function getFontSize(fallback: number): number {
  return config.get("fontSize", fallback);
}

function setFontSize(value: number): void {
  config.set("fontSize", value);
}

class FontSizeSetupScreen extends ListScreen {
  build(): void {
    this.headline("Font size:");
    this.text({
      text: "Tap on text to change size",
      fontSize: getFontSize(BASE_FONT_SIZE)
    });
  }
}

Page({
  onInit() {
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle("");

    new FontSizeSetupScreen().build();
  }
}) 