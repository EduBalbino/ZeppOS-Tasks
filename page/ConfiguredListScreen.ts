import { ListScreen } from "../lib/mmk/ListScreen";
import { BASE_FONT_SIZE } from "../lib/mmk/UiParams";

const { config } = getApp()._options.globalData;

export class ConfiguredListScreen extends ListScreen {
  protected accentColor: number;
  protected fontSize: number;

  constructor() {
    super();
    this.accentColor = 0x00a2b6;
    this.fontSize = config.get("fontSize", BASE_FONT_SIZE);
  }
} 