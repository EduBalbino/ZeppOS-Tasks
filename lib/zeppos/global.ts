interface GlobalObject {
  Logger?: any;
  [key: string]: any;
}

declare const self: GlobalObject;
declare const window: GlobalObject;
declare const global: GlobalObject;
declare const globalThis: GlobalObject;

export function getGlobal(): GlobalObject {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  throw new Error('unable to locate global object');
} 