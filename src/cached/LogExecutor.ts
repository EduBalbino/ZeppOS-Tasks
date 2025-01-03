interface BaseLogRecord {
    id: string | number;
}

interface InsertTaskRecord extends BaseLogRecord {
    command: 'insert_task';
    title: string;
}

interface SetCompletedRecord extends BaseLogRecord {
    command: 'set_completed';
    value: boolean;
}

interface SetTitleRecord extends BaseLogRecord {
    command: 'set_title';
    value: string;
}

interface DeleteRecord extends BaseLogRecord {
    command: 'delete';
}

type LogRecord = InsertTaskRecord | SetCompletedRecord | SetTitleRecord | DeleteRecord;

export class LogExecutor {
    private log: LogRecord[];
    private taskList: TaskListInterface;
    private idOverride: { [key: string]: string };

    constructor(log: LogRecord[], taskList: TaskListInterface) {
        this.log = log;
        this.taskList = taskList;
        this.idOverride = {};
    }

    start(): Promise<void> {
        if(this.log.length === 0) return Promise.resolve();

        const record = this.log.shift()!;
        switch(record.command) {
            case "insert_task":
                return this._log_insert_task(record);
            case "set_completed":
                return this._log_set_completed(record);
            case "set_title":
                return this._log_set_title(record);
            case "delete":
                return this._log_delete(record);
            default:
                const unknownRecord = record as { command: string };
                console.log(`WARN: Unprocessable command: ${unknownRecord.command}`);
                return this.start();
        }
    }

    private _log_insert_task(record: InsertTaskRecord): Promise<void> {
        const {id, title} = record;
        console.log(`LOG_EXEC: Will create task "${title}", virtual_id=cached:${id}`);

        return this.taskList.insertTask(title).then((d: any) => {
            console.log(`LOG_EXEC: Map cached:${id} -> ${d?.id}`);
            this.idOverride[`cached:${id}`] = d?.id;
            return this.start();
        });
    }

    private _log_set_completed(record: SetCompletedRecord): Promise<void> {
        let {id, value} = record;
        if(this.idOverride[id]) id = this.idOverride[id];

        console.log(`LOG_EXEC: Will set task ${id} to completed=${value}`);
        return this.taskList.getTask(id).setCompleted(value).then(() => {
            return this.start();
        }).catch((e) => {
            console.log(e);
            return this.start();
        });
    }

    private _log_set_title(record: SetTitleRecord): Promise<void> {
        let {id, value} = record;
        if(this.idOverride[id]) id = this.idOverride[id];

        console.log(`LOG_EXEC: Will set task ${id} to title=${value}`);
        return this.taskList.getTask(id).setTitle(value).then(() => {
            return this.start();
        });
    }

    private _log_delete(record: DeleteRecord): Promise<void> {
        let {id} = record;
        if(this.idOverride[id]) id = this.idOverride[id];

        console.log(`LOG_EXEC: Will delete task ${id}`);
        return this.taskList.getTask(id).delete().then(() => {
            return this.start();
        });
    }
} 