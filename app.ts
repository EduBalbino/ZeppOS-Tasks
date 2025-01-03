import './lib/zeppos/device-polyfill'
import { MessageBuilder } from './lib/zeppos/message'
import { ConfigStorage } from "./lib/mmk/ConfigStorage";
import { prepareFetch } from './lib/mmk/FetchForward';
import { TasksProvider } from "./src/TasksProvider";
import { FsTools } from "./lib/mmk/Path";

const appId: number = 1023438;
FsTools.appTags = [appId, "app"];

const messageBuilder = new MessageBuilder({ appId });
const config = new ConfigStorage();
const tasksProvider = new TasksProvider(config, messageBuilder);

App({
  globalData: {
    appTags: [appId, "app"] as [number, string],
    messageBuilder,
    config,
    tasksProvider,
  },

  onCreate() {
    console.log("app.onCreate()");
    prepareFetch(messageBuilder);
    
    this.globalData.messageBuilder.connect();
    this.globalData.config.load();
  },

  onDestroy() {
    console.log("app.onDestroy()");
    this.globalData.messageBuilder.disConnect();
  }
} as HmWearableProgram.DeviceSide.App.AppOptions);