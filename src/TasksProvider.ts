import { deviceName } from "../lib/mmk/DeviceIdentifier";
import { OfflineHandler } from "./cached/OfflineHandler";
import { CachedTaskList } from "./cached/CachedTaskList";

import { LogExecutor } from "./cached/LogExecutor";
import { MessageBuilder } from "../lib/zeppos/message";
import { ConfigStorage } from "../lib/mmk/ConfigStorage";


interface LoginData {
  provider: "google" | "microsoft" | "tick_tick" | "caldav";
  token: string;
  error?: string;
}

export class TasksProvider {
    private config: ConfigStorage;
    private messageBuilder: MessageBuilder;
    private _handler: TaskHandlerInterface | false;

    constructor(config: ConfigStorage, messageBuilder: MessageBuilder) {
        this.config = config;
        this.messageBuilder = messageBuilder;
        this._handler = false;
    }

    get cantListCompleted(): boolean {
        return this._handler ? this._handler.cantListCompleted : false;
    }

    private _createHandler(data: LoginData): TaskHandlerInterface {
        switch(data.provider) {
            /*case "google":
                return new GoogleHandler(data.token);
            case "microsoft":
                return new MicrosoftHandler(data.token);
            case "tick_tick":
                return new TickTickHandler(data.token);
            case "caldav":
                return new CalDAVHandler(this.messageBuilder);
                */
            default:
                throw new Error(`Unknown provider: ${data.provider}`);
        }
    }

    init(): Promise<boolean | void> {
        if(this._handler) return Promise.resolve();

        if(this.config.get("forever_offline")) {
            this._handler = new OfflineHandler(this.config);
            return Promise.resolve();
        }

        return this.messageBuilder.request({
            package: "tasks_login",
            action: "get_data",
            deviceName,
        }, {}).then((data: LoginData) => {
            if(data.error) throw new Error(data.error);
            console.log(JSON.stringify(data));
            this._handler = this._createHandler(data);
            return true;
        });
    }

    setupOffline(): void {
        this._handler = new OfflineHandler(this.config);
        
        // Create 15 sample tasks
        const sampleTasks = [
            { id: "1", title: "Buy groceries", completed: false },
            { id: "2", title: "Schedule dentist appointment", completed: false },
            { id: "3", title: "Review project proposal", completed: false },
            { id: "4", title: "Call mom", completed: false },
            { id: "5", title: "Update workout plan", completed: false },
            { id: "6", title: "Pay utility bills", completed: false },
            { id: "7", title: "Clean garage", completed: false },
            { id: "8", title: "Book flight tickets", completed: false },
            { id: "9", title: "Prepare presentation", completed: false },
            { id: "10", title: "Fix bike", completed: false },
            { id: "11", title: "Water plants", completed: false },
            { id: "12", title: "Read new book chapter", completed: false },
            { id: "13", title: "Update resume", completed: false },
            { id: "14", title: "Plan weekend trip", completed: false },
            { id: "15", title: "Organize photos", completed: false }
        ].map(task => ({
            ...task,
            // TODO: Edit functionality temporarily disabled
            setCompleted: () => Promise.resolve(),
            setTitle: () => Promise.resolve(),
            delete: () => Promise.resolve(),
            sync: () => Promise.resolve()
        }));

        this.config.update({
            forever_offline: true,
            tasks: sampleTasks,
            log: [],
        });
    }

    /**
     * Create cache data for offline work
     * @param listId ID of list used for cache
     * @param tasks Existing tasks
     */
    createCacheData(listId: string, tasks: TaskInterface[]): void {
        if(this.config.get("forever_offline", false))
            throw new Error("Cache data will override offline data.");

        const cacheData = tasks.map(task => ({
            title: task.title,
            completed: task.completed,
            id: task.id,
        }));

        this.config.update({
            tasks: cacheData,
            cacheListID: listId,
            log: [],
        });
    }

    getCachedTasksList(): CachedTaskList {
        return new CachedTaskList(this.config, !this.config.get("forever_offline", false));
    }

    getTaskLists(): Promise<any[]> {
        if (!this._handler) {
            throw new Error("Handler not initialized");
        }
        return this._handler.getTaskLists();
    }

    getTaskList(id: string): any {
        if (!this._handler) {
            throw new Error("Handler not initialized");
        }
        if(id === "cached") return this.getCachedTasksList();
        return this._handler.getTaskList(id);
    }

    execCachedLog(): Promise<void> {
        const log = this.config.get("log", []) || [];
        if(log.length === 0) return Promise.resolve();

        if (!this._handler) {
            throw new Error("Handler not initialized");
        }

        const actualTaskList = this._handler.getTaskList(this.config.get("cacheListID"));
        const executor = new LogExecutor(log, actualTaskList);
        return executor.start().then(() => {
            this.config.update({log: []});
        });
    }
} 