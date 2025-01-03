/// <reference path="node_modules/zeppos-device-types-v1/types/index.d.ts" />

// Override the built-in Promise with our custom implementation
interface Promise<T> extends import('./lib/zeppos/promise').PromiseInstance<T> {}
var Promise: import('./lib/zeppos/promise').PromiseConstructor;

interface TaskInterface {
  id: any;
  title: string;
  completed: boolean;

  setCompleted(completed: boolean): Promise<void>;
  setTitle(title: string): Promise<void>;
  delete(): Promise<void>;
  sync(): Promise<void>;
}

interface TaskListInterface {
  id: any;
  title: string;

  insertTask(title: string): Promise<void>;
  getTasks(withCompleted: boolean, pageToken: any): Promise<{
      tasks: TaskInterface[],
      nextPageToken: any,
  }>;
  getTask(id: any): TaskInterface;
}

interface HandlerInterface {
  getTaskLists(): Promise<TaskListInterface[]>;
  getTaskList(id: any): TaskListInterface;
}

interface TaskHandlerInterface extends HandlerInterface {
  cantListCompleted: boolean;
}

// Configuration Interface
interface Config {
    get(key: string, defaultValue?: any): any;
    update(data: { 
        next_id?: number;
        tasks?: any[];
        log?: any[];
    }): void;
}

// Task Data Types
interface TaskData {
    id: string;
    title: string;
    completed: boolean;
}


// Buffer type from Node.js
declare class Buffer extends Uint8Array {
    static alloc(size: number): Buffer;
    static from(arrayBuffer: ArrayBuffer): Buffer;
    static from(str: string, encoding?: string): Buffer;
    static concat(list: Buffer[]): Buffer;
    byteLength: number;
    buffer: ArrayBuffer;
    copy(target: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    fill(value: any, offset?: number, end?: number): this;
    readUInt8(offset: number): number;
    readUInt16LE(offset: number): number;
    readUInt32LE(offset: number): number;
    writeUInt8(value: number, offset: number): number;
    writeUInt16LE(value: number, offset: number): number;
    writeUInt32LE(value: number, offset: number): number;
    subarray(start?: number, end?: number): Buffer;
    toString(encoding?: string): string;
}

// Messaging type for side communication
declare const messaging: {
    peerSocket: {
        addListener(event: string, callback: (message: ArrayBuffer) => void): void;
        send(data: ArrayBuffer): void;
    };
};

declare const DeviceRuntimeCore: {
    HmLogger: {
      getLogger: (name: string) => {
        log(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        level: number;
        levels: {
          all: number;
          warn: number;
          // ... other levels as needed
        };
        connect(options: {
          log: (logEvent: any) => void;
        }): void;
        eventBus?: {
          count(): number;
        };
      };
    };
    Buffer: typeof Buffer;
};

// Extend the AppInstance type to include our custom globalData
declare module HmWearableProgram.DeviceSide.App {
  interface AppInstance {
    globalData: {
      appTags: [number, string];
      messageBuilder: import('./lib/zeppos/message').MessageBuilder;
      config: import('./lib/mmk/ConfigStorage').ConfigStorage;
      tasksProvider: import('./src/TasksProvider').TasksProvider;
    };
  }
}

// Use the extended AppInstance type
declare function getApp(): HmWearableProgram.DeviceSide.App.AppInstance;

// Use AppOptions type for App constructor
declare function App(options: HmWearableProgram.DeviceSide.App.AppOptions & {
  globalData: {
    appTags: [number, string];
    messageBuilder: import('./lib/zeppos/message').MessageBuilder;
    config: import('./lib/mmk/ConfigStorage').ConfigStorage;
    tasksProvider: import('./src/TasksProvider').TasksProvider;
  };
}): void;