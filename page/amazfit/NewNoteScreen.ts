import { ScreenBoard } from "../../lib/mmk/ScreenBoard";
import { createSpinner } from "../Utils";
import { ConfiguredListScreen } from "../ConfiguredListScreen";

// Get global data with type assertions
const { t, tasksProvider } = (getApp() as any)._options.globalData;

interface NewNoteParams {
  list: string;
}

interface TaskList {
  insertTask: (text: string) => Promise<void>;
}

class NewNoteScreen extends ConfiguredListScreen {
  private params: NewNoteParams;
  private board: ScreenBoard;

  constructor(params: string) {
    super();
    console.log(params);

    this.params = JSON.parse(params) as NewNoteParams;
    this.board = new ScreenBoard();
    this.board.title = "New note:";
    this.board.confirmButtonText = "Create";
    this.board.onConfirm = (v: string) => this.doCreateTask(v);
  }

  build(): void {
    this.board.visible = true;
  }

  private doCreateTask(text: string): void {
    this.board.visible = false;

    createSpinner();
    console.log(JSON.stringify(tasksProvider));
    const list = tasksProvider.getTaskList(this.params.list) as TaskList;
    list.insertTask(text).then(() => {
      hmApp.goBack();
    })
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    hmUI.setStatusBarVisible(false);
    new NewNoteScreen(params).build();
  }
}) 