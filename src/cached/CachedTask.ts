export class CachedTask implements TaskInterface {
    id: string;
    title: string;
    completed: boolean;
    private config: Config;
    private withLog: boolean;

    constructor(data: TaskData, config: Config, withLog: boolean) {
        this.id = data.id;
        this.title = data.title;
        this.completed = data.completed;

        this.config = config;
        this.withLog = withLog;
    }

    private _getSelfIndex(tasks: TaskData[]): number | null {
        for(const i in tasks) {
            if(tasks[i].id === this.id)
                return parseInt(i);
        }
        return null;
    }

    sync(): Promise<void> {
        return Promise.resolve();
    }

    setCompleted(value: boolean): Promise<void> {
        const tasks = this.config.get("tasks") as TaskData[];
        const log = this.config.get("log", []) as any[];

        const i = this._getSelfIndex(tasks);
        if (i !== null) {
            tasks[i].completed = value;
        }

        if(this.withLog) 
            log.push({command: "set_completed", id: this.id, value});

        this.config.update({tasks, log});
        this.completed = value;
        return Promise.resolve();
    }

    setTitle(value: string): Promise<void> {
        const tasks = this.config.get("tasks") as TaskData[];
        const log = this.config.get("log", []) as any[];

        const i = this._getSelfIndex(tasks);
        if (i !== null) {
            tasks[i].title = value;
        }

        if(this.withLog) 
            log.push({command: "set_title", id: this.id, value});

        this.config.update({tasks, log});
        this.title = value;
        return Promise.resolve();
    }

    delete(): Promise<void> {
        const log = this.config.get("log", []) as any[];
        let tasks = this.config.get("tasks") as TaskData[];

        tasks = tasks.filter((item) => item.id !== this.id);

        if(this.withLog) 
            log.push({command: "delete", id: this.id});

        this.config.update({tasks, log});
        return Promise.resolve();
    }
} 