import { MarkdownRenderScreen, ResolveFromAssets } from "../../lib/mmk/MarkdownRender";

Page({
  onInit(filename: string = '') {
    console.log("[MarkdownReader] Starting with filename:", filename);
    try {
      hmUI.setStatusBarVisible(true);
      hmUI.updateStatusBarTitle("Help index");

      console.log("[MarkdownReader] Setting screen keep and brightness");
      hmApp.setScreenKeep(true);
      hmSetting.setBrightScreen(15);
      hmUI.setLayerScrolling(true);  // Enable scrolling for markdown content

      console.log("[MarkdownReader] Creating resolver for help files");
      const basePath = 'raw/help_en';
      console.log("[MarkdownReader] Base path:", basePath, "filename:", filename);
      
      const resolver = new ResolveFromAssets(
        basePath,
        "page/amazfit/",
        "help"
      );

      console.log("[MarkdownReader] Creating reader instance with file:", filename);
      const reader = new MarkdownRenderScreen(resolver, filename);
      console.log("[MarkdownReader] Starting reader");
      reader.start();
      console.log("[MarkdownReader] Reader started");
    } catch(e) {
      console.log("[MarkdownReader] Error:", e);
      console.log("[MarkdownReader] Error details:", JSON.stringify(e));
      hmUI.showToast({
        text: "Error loading help content"
      });
    }
  },

  onDestroy() {
    console.log("[MarkdownReader] Cleaning up");
    hmUI.setLayerScrolling(false);
    hmApp.setScreenKeep(false);
  }
}) 