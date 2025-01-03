import { ListScreen } from "../../lib/mmk/ListScreen";
import { ScreenBoard } from "../../lib/mmk/ScreenBoard";
import { createSpinner } from "../Utils";

const { tasksProvider } = getApp()._options.globalData;

interface TaskEditParams {
  list_id: string;
  task_id: string;
}

interface EditableTask {
  title: string;
  sync: () => Promise<void>;
  delete: () => Promise<void>;
  setTitle: (value: string) => Promise<void>;
}

interface TaskList {
  getTask: (taskId: string) => EditableTask;
}

// Define widget types based on hmUI namespace
interface RowWidget {
  textView?: ReturnType<typeof hmUI.createWidget>;
  iconView?: ReturnType<typeof hmUI.createWidget>;
}

class TaskEditScreen extends ListScreen {
  private isSaving: boolean;
  private task: EditableTask;
  private board!: ScreenBoard;
  private deleteRow!: RowWidget;

  constructor(param: string) {
    super();
    this.isSaving = false;

    const params = JSON.parse(param) as TaskEditParams;
    const taskList = tasksProvider.getTaskList(params.list_id) as TaskList;
    this.task = taskList.getTask(params.task_id);
  }

  init(): void {
    const hideSpinner = createSpinner();
    this.task.sync().then(() => {
      hideSpinner();
      this.build();
    })
  }

  build(): void {
    this.text({
      text: this.task.title,
      fontSize: this.fontSize + 2
    });
    this.offset(16);
    this.headline("Actions");
    this.row({
      text: "Edit",
      icon: "icon_s/edit.png",
      onTap: () => {
        this.board.visible = true;
        hmApp.setLayerY(0);
        hmUI.setLayerScrolling(false);
      }
    });
    this.deleteRow = this.row({
      text: "Delete",
      icon: "icon_s/delete.png",
      onTap: () => this.doDelete()
    })
    this.offset();

    this.board = new ScreenBoard();
    this.board.title = "Edit task";
    this.board.value = this.task.title;
    this.board.confirmButtonText = "Save";
    this.board.onConfirm = (v: string) => this.doOverrideTitle(v);
    this.board.visible = false;
  }

  private doDelete(): void {
    if(this.isSaving) return;

    this.isSaving = true;
    this.deleteRow.textView?.setProperty(hmUI.prop.TEXT, "Deleting…");

    createSpinner();
    this.task.delete().then(() => {
      hmApp.goBack();
    });
  }

  private doOverrideTitle(value: string): void {
    if(this.isSaving) return;

    this.isSaving = true;
    this.board.confirmButtonText = "Saving, wait…";
    this.task.setTitle(value).then(() => {
      hmApp.goBack();
    })
  }
}

// Page configuration
Page({
  onInit(params: string = '') {
    hmUI.setStatusBarVisible(true);
    hmUI.updateStatusBarTitle("");

    hmApp.setScreenKeep(true);
    hmSetting.setBrightScreen(15);

    try {
      new TaskEditScreen(params).init();
    } catch(e) {
      console.log(e);
    }
  },

  onDestroy() {
    hmApp.setScreenKeep(false);
    hmSetting.setBrightScreenCancel();
  }
}) 