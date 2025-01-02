import { 
  ICON_SIZE_MEDIUM, 
  IS_LOW_RAM_DEVICE, 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT 
} from "../lib/mmk/UiParams";

// Get global data with type assertions
const { messageBuilder, t } = (getApp() as any)._options.globalData;

interface RequestData {
  package: string;
  action: string;
  value?: any;
  [key: string]: any;
}

interface RequestOptions {
  timeout?: number;
}

// Define animation status enum
enum AnimationStatus {
  START = 1,
  PAUSE = 2,
  STOP = 3,
  RESUME = 4
}

// Extend hmUI interface to include animation status
declare global {
  interface IHmUI {
    anim_status: typeof AnimationStatus;
  }
}

export function request(data: RequestData, timeout: number = 10000): Promise<any> {
  if(!hmBle.connectStatus()) return Promise.reject("No connection to phone");
  return messageBuilder.request(data, {timeout}).then((data: any) => {
    if(data.error) 
      throw new Error(data.error);
    return Promise.resolve(data);
  });
}

export function createSpinnerLowRam(): () => void {
  const spinner = hmUI.createWidget(hmUI.widget.IMG, {
    x: Math.floor((SCREEN_WIDTH - ICON_SIZE_MEDIUM) / 2),
    y: Math.floor((SCREEN_HEIGHT - ICON_SIZE_MEDIUM) / 2),
    src: "spinner.png"
  });
  return () => hmUI.deleteWidget(spinner);
}

export function createSpinner(): () => void {
  if(IS_LOW_RAM_DEVICE) return createSpinnerLowRam();

  const spinner = hmUI.createWidget(hmUI.widget.IMG_ANIM, {
    x: Math.floor((SCREEN_WIDTH - ICON_SIZE_MEDIUM) / 2),
    y: Math.floor((SCREEN_HEIGHT - ICON_SIZE_MEDIUM) / 2),
    anim_path: "spinner",
    anim_prefix: "img",
    anim_ext: "png",
    anim_fps: 12,
    anim_size: 12,
    anim_status: AnimationStatus.START,
    repeat_count: 0,
  });

  return () => hmUI.deleteWidget(spinner);
}

export function getOfflineInfo(err: string): string {
  if(err.startsWith("Timed out"))
    return t("Work offline, connection timed out");

  switch(err) {
    case "login_first":
      return t("Log into your Google account via Zepp app to use all features");
    default:
      return err;
  }
} 