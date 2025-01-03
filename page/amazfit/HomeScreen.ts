import { ICON_SIZE_MEDIUM, SCREEN_MARGIN_Y, SCREEN_WIDTH } from "../../lib/mmk/UiParams";
import { createSpinner, getOfflineInfo } from "../Utils";
import { ConfiguredListScreen } from "../ConfiguredListScreen";
import { TouchEventManager } from "../../lib/mmk/TouchEventManager";

// Get global data with type assertions
const { config, tasksProvider, messageBuilder } = (getApp() as any)._options.globalData;

interface HomeScreenParams {
  page?: string;
  [key: string]: any;
}

interface TaskData {
  tasks: Task[];
  nextPageToken?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  setCompleted: (completed: boolean) => void;
}

export interface TaskList {
  id: string;
  title: string;
  getTasks: (withComplete: boolean, page?: string) => Promise<TaskData>;
}

class HomeScreen extends ConfiguredListScreen {
  private params: HomeScreenParams;
  private cachedMode: boolean = false;
  private currentList: TaskList | null = null;
  private taskData: TaskData | null = null;
  private taskLists: TaskList[] = [];
  private hideSpinner!: () => void;

  constructor(params: string) {
    super();
    try {
      this.params = JSON.parse(params || '{}');
    } catch(e) {
      this.params = {};
    }
  }

  init(): void {
    // Loading spinner
    this.hideSpinner = createSpinner();

    // First chain: notify offline status
    messageBuilder.request({
      package: "tasks_login",
      action: "notify_offline",
      value: config.get("forever_offline", false),
    }, {}).catch((e: Error) => console.log('Notify offline error:', e.message));

    // Second chain: load task lists
    tasksProvider.init().then(() => {
      return tasksProvider.getTaskLists();
    }).then((lists: TaskList[]) => {
      this.taskLists = lists;

      if(config.get("forever_offline")) {
        this.currentList = this.taskLists[0]
      } else {
        this.currentList = this.findCurrentList();
        if(!this.currentList) return this.openSettings("setup", true);
      }

      return tasksProvider.execCachedLog();
    }).then(() => {
      if (!this.currentList) return;
      return this.currentList.getTasks(config.get("withComplete", false), this.params.page);
    }).then((taskData: TaskData) => {
      if (!taskData) return;
      this.taskData = taskData;

      // If not offline and not on second pages, create cache for offline work
      if(!config.get("forever_offline") && !this.params.page && this.currentList)
        tasksProvider.createCacheData(this.currentList.id, this.taskData.tasks);

      // Build UI
      this.hideSpinner();
      this.build();
    }).catch((error: Error | string) => {
      this.onInitFailure(error instanceof Error ? error.message : error);
      this.hideSpinner();
    });
  }

  openSettings(mode: string, replace: boolean = false): void {
    const params = {
      url: `page/amazfit/SettingsScreen`,
      param: JSON.stringify({
        lists: this.taskLists,
        fromReplace: replace,
        mode
      })
    };

    replace ? hmApp.reloadPage(params) : hmApp.gotoPage(params);
  }

  openNewNoteUI(): void {
    if (!this.currentList) return;
    hmApp.gotoPage({
      url: `page/amazfit/NewNoteScreen`,
      param: JSON.stringify({
        list: this.currentList.id
      })
    })
  }

  findCurrentList(): TaskList | null {
    const selectedList = config.get("cur_list_id");
    for (const entry of this.taskLists) {
      if (entry.id === selectedList) {
        return entry;
      }
    }
    return null;
  }

  build(offlineInfo: string = ""): void {
    if (!this.currentList) return;

    // Header
    this.twoActionBar([
      {
        text: this.cachedMode ? getOfflineInfo(offlineInfo) : this.currentList.title,
        icon: `icon_s/mode_${this.cachedMode ? "cached" : "online"}.png`,
        callback: () => this.openSettings(this.cachedMode ? "cached": "online"),
        card: {
          width: SCREEN_WIDTH - 64,
          radius: 32
        }
      },
      {
        text: "New…",
        icon: "icon_s/new.png",
        callback: () => this.openNewNoteUI(),
        card: {
          width: 64,
          radius: 32
        }
      }
    ])

    // Tasks
    this.headline(this.cachedMode ? "Offline tasks:" : "Tasks:");
    
    const tasks = this.taskData?.tasks || [];
    this.batchCreateItems(tasks);

    if(tasks.length === 0) {
      this.text({
        text: "There's no incomplete tasks in that list"
      });
    }

    this.taskData?.nextPageToken ? this.moreButton() : this.offset();
  }

  // Helper method to create items in batches
  private batchCreateItems(tasks: Task[]): void {
    for (const task of tasks) {
      this.taskCard(task);
    }
  }

  moreButton(): void {
    if (!this.taskData?.nextPageToken) return;

    const height = Math.max(64, SCREEN_MARGIN_Y);
    const view = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: this.positionY,
      w: SCREEN_WIDTH,
      h: height,
      pos_x: Math.floor((SCREEN_WIDTH - ICON_SIZE_MEDIUM) / 2),
      pos_y: Math.floor((height - ICON_SIZE_MEDIUM) / 2),
      src: "icon_m/more.png"
    });

    new TouchEventManager(view).ontouch = () => {
      hmApp.reloadPage({
        url: `page/amazfit/HomeScreen`,
        param: JSON.stringify({
          page: this.taskData!.nextPageToken
        })
      })
    };

    this.positionY += height;
  }

  taskCard(data: Task): void {
    if (!this.currentList) return;
    let { title, completed } = data;

    if(!title) title = "";
    const row = this.row({
      text: title,
      card: {
        hiddenButton: "Edit",
        hiddenButtonCallback: () => {
          hmApp.gotoPage({
            url: `page/amazfit/TaskEditScreen`,
            param: JSON.stringify({
              list_id: this.currentList!.id,
              task_id: data.id
            })
          })
        }
      },
      onTap: () => {
        completed = !completed;

        try {
          data.setCompleted(completed)
        } catch(e) {
          hmUI.showToast({ text: (e as Error).message });
          return;
        }

        updateComplete();
      }
    });

    const updateComplete = () => {
      row.textView!.setProperty(hmUI.prop.COLOR, completed ? 0x999999 : 0xFFFFFF);
      row.iconView!.setProperty(hmUI.prop.SRC, completed ? 'icon_s/cb_true.png' : 'icon_s/cb_false.png');
    }

    updateComplete();
  }

  onInitFailure(message: string): void {
    if(config.get("tasks", false) && !config.get("forever_offline", false)) {
      this.cachedMode = true;
      this.currentList = tasksProvider.getCachedTasksList();
      console.log(JSON.stringify(config.get("log")))
      if (this.currentList) {
        this.currentList.getTasks(false).then((tasks: TaskData) => {
          this.taskData = tasks;
          this.build(message);
        });
      }
      return;
    }

    // Show error and option to work without sync
    this.row({
      text: getOfflineInfo(message),
      color: 0xFF9900,
      icon: "icon_s/mode_cached.png",
      card: {
        width: SCREEN_WIDTH,
        radius: 8
      }
    });

    this.row({
      text: "Use application without sync",
      icon: "icon_s/mode_offline.png",
      onTap: () => {
        console.log("[HomeScreen] Setting up offline mode");
        tasksProvider.setupOffline();
        hmApp.reloadPage({
          url: `page/amazfit/HomeScreen`,
        });
      }
    });
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    console.log("HomePage.build()");
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle("Tasks");

    hmApp.setScreenKeep(true);
    hmSetting.setBrightScreen(15);

    try {
      new HomeScreen(params).init();
    } catch(e) {
      console.log(e);
    }
  },

  onDestroy() {
    hmApp.setScreenKeep(false);
    hmSetting.setBrightScreenCancel();
  }
}) 