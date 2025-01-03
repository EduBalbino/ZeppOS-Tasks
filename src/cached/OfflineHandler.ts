import { CachedTaskList } from "./CachedTaskList";

export class OfflineHandler implements TaskHandlerInterface {
    private config: Config;
    cantListCompleted = false;

    constructor(config: Config) {
        this.config = config;
    }

    getTaskLists(): Promise<TaskListInterface[]> {
        return Promise.resolve([this.getTaskList("")]);
    }

    getTaskList(id: any): TaskListInterface {
        return new CachedTaskList(this.config);
    }
} 