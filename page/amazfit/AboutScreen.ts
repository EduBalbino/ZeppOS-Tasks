import { VERSION } from "../../version";
import { TouchEventManager } from "../../lib/mmk/TouchEventManager";
import { ConfiguredListScreen } from "../ConfiguredListScreen";
import {
  IS_MI_BAND_7,
  SCREEN_WIDTH,
  SCREEN_MARGIN_X,
  WIDGET_WIDTH,
  SCREEN_MARGIN_Y,
  BASE_FONT_SIZE,
  ICON_SIZE_SMALL,
  SCREEN_HEIGHT
} from "../../lib/mmk/UiParams";

interface AboutScreenParams {
  [key: string]: any;
}

class AboutScreen extends ConfiguredListScreen {
  private appId: number = 1023438;
  private appName: string = "Tasks";
  private version: string = VERSION;
  private iconSize: number = 100;
  private iconFile: string = "icon_about.png";
  private deviceInfoVisible: boolean = false;
  private clickCount: number = 5;

  constructor(params: string) {
    super();
    console.log("[AboutScreen] Starting with params:", params);
  }

  build(): void {
    console.log("[AboutScreen] Building UI");
    try {
      // App icon with click counter
      const icon = this.card({
        height: this.iconSize + 16,
        color: 0,
        onTap: () => {
          if(this.clickCount > 0) {
            this.clickCount--;
            return;
          }
          this.deviceInfoVisible = true;
          this.build(); // Rebuild the UI
        }
      });

      hmUI.createWidget(hmUI.widget.IMG, {
        x: (SCREEN_WIDTH - this.iconSize) / 2,
        y: 8,
        w: this.iconSize,
        h: this.iconSize,
        src: this.iconFile
      });

      // App name
      this.text({
        text: this.appName,
        fontSize: BASE_FONT_SIZE * 1.5,
        align: hmUI.align.CENTER_H
      });

      // Version
      this.text({
        text: this.version,
        color: 0xAAAAAA,
        fontSize: BASE_FONT_SIZE,
        align: hmUI.align.CENTER_H
      });

      // Help button
      this.row({
        text: "Help",
        icon: "icon_s/help.png",
        onTap: () => {
          hmApp.gotoPage({
            url: "page/amazfit/MarkdownReader",
            param: "index.md"
          });
        }
      });

      // Donate button
      this.row({
        text: "Donate",
        icon: "icon_s/donate.png",
        onTap: () => {
          hmApp.gotoPage({
            url: "page/amazfit/DonatePage"
          });
        }
      });

      // Developer info
      this.headline("Developer");
      this.row({
        text: "melianmiko",
        icon: "icon_s/dev.png"
      });

      // Device info (hidden by default)
      if (this.deviceInfoVisible) {
        this.headline("Device Info");
        const info = hmSetting.getDeviceInfo();
        this.text({
          text: `Model: ${info.deviceName}\nSource: ${info.deviceSource}\nScreen: ${info.width}x${info.height}`,
          color: 0xAAAAAA,
          fontSize: BASE_FONT_SIZE - 2
        });
      }

      // Uninstall button (Mi Band 7 only)
      if (IS_MI_BAND_7) {
        this.row({
          text: "Uninstall",
          icon: "icon_s/uninstall.png",
          onTap: () => this.uninstall()
        });
      }

      this.offset();
    } catch(e) {
      console.log("[AboutScreen] Error building UI:", e);
      console.log("[AboutScreen] Error details:", JSON.stringify(e));
      hmUI.showToast({
        text: "Error building UI"
      });
    }
  }

  private uninstall(): void {
    if(this.clickCount > 0) {
      this.clickCount--;
      hmUI.showToast({
        text: "Tap again to confirm"
      });
      return;
    }

    const dirname = this.appId.toString(16).padStart(8, "0").toUpperCase();
    const appDir = `/storage/js_apps/${dirname}`;
    const dataDir = `/storage/js_apps/data${dirname}`;

    // Show uninstall complete screen
    hmApp.setLayerY(0);
    hmUI.setLayerScrolling(false);
    
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 0,
      w: SCREEN_WIDTH,
      h: SCREEN_HEIGHT
    });

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: SCREEN_WIDTH,
      h: SCREEN_HEIGHT,
      color: 0x0
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: SCREEN_MARGIN_X,
      y: 200,
      w: WIDGET_WIDTH,
      h: 290,
      text: "Uninstall complete",
      text_style: hmUI.text_style.WRAP,
      align_h: hmUI.align.CENTER_H,
      color: 0xFFFFFF
    });

    const touch = new TouchEventManager(group);
    touch.ontouch = () => {
      hmApp.startApp({
        url: "Settings_systemScreen",
        native: true,
        appid: 0x0001
      });
    };
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    console.log("[AboutScreen] Page onInit with params:", params);
    hmUI.setStatusBarVisible(false);
    new AboutScreen(params).build();
  }
}) 