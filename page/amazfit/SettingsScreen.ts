import { ConfiguredListScreen } from "../ConfiguredListScreen";
import { TaskList } from "./HomeScreen";

// Get global data with type assertions
const { config, t, tasksProvider } = (getApp() as any)._options.globalData;

interface SettingsScreenParams {
  mode: 'setup' | 'cached' | 'offline' | 'online';
  lists: TaskList[];
  fromReplace: boolean;
}

class SettingsScreen extends ConfiguredListScreen {
  private mode: SettingsScreenParams['mode'];
  private lists: TaskList[];
  private fromReplace: boolean;
  private wipeConfirm: number;

  constructor(params: string) {
    super();

    const parsedParams = JSON.parse(params) as SettingsScreenParams;
    this.mode = parsedParams.mode;
    this.lists = parsedParams.lists;
    this.fromReplace = parsedParams.fromReplace;

    this.wipeConfirm = 3;
  }

  build(): void {
    if(this.mode !== "setup") this.buildHelpItems();

    // Lists picker
    if(this.mode !== "cached") {
      this.headline(t('Task lists:'));
      this.lists.forEach(({ id, title }) => this.row({
        text: title,
        icon: "icon_s/list.png",
        onTap: () => this.applyList(id)
      }));
    }

    // UI settings
    if(this.mode !== "setup") {
      this.headline(t("User interface:"));
      this.row({
        text: t("Font size…"),
        icon: "icon_s/font_size.png",
        onTap: () => hmApp.gotoPage({
          url: `page/amazfit/FontSizeSetupScreen`
        })
      });
      this.row({
        text: t("Keyboard…"),
        icon: "icon_s/keyboard.png",
        onTap: () => hmApp.gotoPage({
          url: `page/amazfit/ScreenBoardSetup`
        })
      });
      if(this.mode !== "cached" && tasksProvider && !tasksProvider.cantListCompleted)
        this.row({
          text: t("Show complete tasks"),
          icon:  `icon_s/cb_${config.get("withComplete", false)}.png`,
          onTap: () => {
            config.set("withComplete", !config.get("withComplete", false));
            hmApp.goBack();
          }
        })
    }

    // Advanced settings
    if(this.mode !== "setup") {
      this.headline(t("Advanced:"));
      if(config.get("forever_offline", false)) {
        this.row({
          text: t("Remove completed tasks"),
          icon: "icon_s/cleanup.png",
          onTap: () => this.offlineRemoveComplete()
        })
      }
      this.row({
        text: t("Wipe ALL local data"),
        icon: "icon_s/wipe_all.png",
        onTap: () => this.wipeEverything()
      });
      if(this.mode !== "offline") this.text({
        text: t("Option above didn't delete any data from your Google account"),
        fontSize: this.fontSize - 2,
        color: 0x999999
      });
    }

    this.offset();
  }

  private applyList(id: string): void {
    config.set("cur_list_id", id);

    const rq = {
      url: `page/amazfit/HomeScreen`
    };

    this.fromReplace ? hmApp.reloadPage(rq) : hmApp.goBack();
  }

  private wipeEverything(): void {
    if(this.wipeConfirm > 0) {
      this.wipeConfirm--;
      return hmUI.showToast({text: t("Tap again to confirm")});
    }

    config.wipe();
    hmApp.goBack();
  }

  private offlineRemoveComplete(): void {
    const storage = config.get("tasks", []) as Array<{ completed: boolean }>;
    const output = storage.filter(task => !task.completed);
    config.set("tasks", output);
    hmApp.goBack();
  }

  private buildHelpItems(): void {
    this.row({
      text: t("About…"),
      icon: "icon_s/about.png",
      onTap: () => hmApp.gotoPage({
        url: `page/amazfit/AboutScreen`,
        param: JSON.stringify({})
      })
    });
    this.row({
      text: t("Help index"),
      icon: "icon_s/help.png",
      onTap: () => hmApp.gotoPage({
        url: `page/amazfit/MarkdownReader`,
        param: "index.md"
      })
    });
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle("");

    new SettingsScreen(params).build();
  }
}) 