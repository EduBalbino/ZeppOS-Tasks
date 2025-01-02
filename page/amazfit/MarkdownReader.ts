import { MarkdownRenderScreen, ResolveFromAssets } from "../../lib/mmk/MarkdownRender";

// Get global data with type assertions
const { t } = (getApp() as any)._options.globalData;

Page({
  onInit(filename: string = '') {
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle(t("Help index"));

    hmApp.setScreenKeep(true);
    hmSetting.setBrightScreen(15);

    try {
      const resolver = new ResolveFromAssets(
        `raw/help_${t("help_file_prefix")}`,
        "page/amazfit/",
        "help"
      );
      const reader = new MarkdownRenderScreen(resolver, filename);
      reader.start();
    } catch(e) {
      console.log(e);
    }
  }
}) 