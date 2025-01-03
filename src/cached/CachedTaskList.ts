import { CachedTask } from "./CachedTask";

export class CachedTaskList implements TaskListInterface {
    id: string;
    title: string;
    private config: Config;
    private withLog: boolean;

    constructor(config: Config, withLog: boolean = false) {
        this.id = "cached";
        this.title = "My tasks";

        this.config = config;
        this.withLog = withLog;
    }

    insertTask(title: string): Promise<void> {
        const nextIndex = this.config.get("next_id", 0);
        const log = this.config.get("log", []) as any[];
        let tasks = this.config.get("tasks") as TaskData[];

        tasks = [
            {id: `cached:${nextIndex}`, title, completed: false},
            ...tasks
        ];

        if(this.withLog) 
            log.push({command: "insert_task", id: nextIndex, title});

        this.config.update({
            next_id: nextIndex + 1,
            tasks,
            log
        });

        return Promise.resolve();
    }

    getTask(id: string): TaskInterface {
        const tasks = this.config.get("tasks") as TaskData[];
        for(const task of tasks) {
            if(task.id === id)
                return new CachedTask(task, this.config, this.withLog);
        }

        throw new Error(`Task ${id} not found`);
    }

    getTasks(withCompleted: boolean, pageToken?: any): Promise<{tasks: TaskInterface[], nextPageToken: any}> {
        let tasks: TaskInterface[] = [];
        const storedTasks = this.config.get("tasks") as TaskData[];
        
        for(let task of storedTasks) {
            if(!task.completed || withCompleted) {
                tasks.push(new CachedTask(task, this.config, this.withLog));
            }
        }

        return Promise.resolve({
            tasks,
            nextPageToken: null,
        });
    }
} 