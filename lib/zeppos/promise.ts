declare const setImmediate: ((callback: (...args: any[]) => void) => void) | undefined;
declare const self: any;
declare const window: any;
declare const global: any;
declare const globalThis: any;

export interface PromiseInstance<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2>;
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult>;
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

export interface PromiseConstructor {
  readonly prototype: Promise<any>;
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
  race<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T>;
  reject<T = never>(reason?: any): Promise<T>;
  resolve(): Promise<void>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  allSettled<T>(values: readonly (T | PromiseLike<T>)[]): Promise<Array<{ status: 'fulfilled', value: T } | { status: 'rejected', reason: any }>>;
}

interface Handler<T> {
  onFulfilled: ((value: T) => any) | null;
  onRejected: ((reason: any) => any) | null;
  promise: Promise<any>;
}

const setTimeoutFunc: typeof setTimeout = setTimeout;

function isArray(x: any): boolean {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop(): void {}

function bind<T extends Function>(fn: T, thisArg: any): T {
  return function(this: any) {
    fn.apply(thisArg, arguments);
  } as any;
}

class Promise<T> implements PromiseInstance<T> {
  private _state: number = 0;
  private _handled: boolean = false;
  private _value: any = undefined;
  private _deferreds: Handler<T>[] = [];

  constructor(fn: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    if (!(this instanceof Promise)) {
      throw new TypeError('Promises must be constructed via new');
    }
    if (typeof fn !== 'function') {
      throw new TypeError('not a function');
    }
    doResolve(fn, this);
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const prom = new Promise<TResult1 | TResult2>(noop);
    handle(this, new HandlerClass(onFulfilled as any, onRejected as any, prom));
    return prom;
  }

  catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): Promise<T | TResult> {
    return this.then(null, onRejected);
  }

  finally(onFinally?: (() => void) | null): Promise<T> {
    const constructor = this.constructor as PromiseConstructor;
    return this.then(
      value => constructor.resolve(onFinally?.()).then(() => value),
      reason => constructor.resolve(onFinally?.()).then(() => { throw reason; })
    );
  }

  static all<T>(arr: readonly (T | PromiseLike<T>)[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      const args = Array.prototype.slice.call(arr) as any[];
      if (args.length === 0) return resolve([]);
      let remaining = args.length;

      function res(i: number, val: any): void {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            const then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                (val: any) => res(i, val),
                reject
              );
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (let i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  }

  static allSettled<T>(arr: readonly (T | PromiseLike<T>)[]): Promise<Array<{ status: 'fulfilled', value: T } | { status: 'rejected', reason: any }>> {
    const P = this;
    return new P((resolve, reject) => {
      if (!isArray(arr)) {
        return reject(
          new TypeError(
            typeof arr +
              ' ' +
              arr +
              ' is not iterable(cannot read property Symbol(Symbol.iterator))',
          ),
        );
      }
      const args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      let remaining = args.length;

      function res(i: number, val: any): void {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          const then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              (val: any) => res(i, val),
              (e: any) => {
                args[i] = { status: 'rejected' as const, reason: e };
                if (--remaining === 0) {
                  resolve(args);
                }
              },
            );
            return;
          }
        }
        args[i] = { status: 'fulfilled' as const, value: val };
        if (--remaining === 0) {
          resolve(args);
        }
      }

      for (let i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  }

  static race<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!isArray(values)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (let i = 0, len = values.length; i < len; i++) {
        Promise.resolve(values[i]).then(resolve, reject);
      }
    });
  }

  static resolve(): Promise<void>;
  static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  static resolve(value?: any): Promise<any> {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(resolve => {
      resolve(value);
    });
  }

  static reject<T = never>(value?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }

  static _immediateFn: (fn: () => void) => void = 
    (typeof setImmediate === 'function' &&
      function(fn) {
        setImmediate(fn);
      }) ||
    function(fn) {
      setTimeoutFunc(fn, 0);
    };

  static _unhandledRejectionFn = function _unhandledRejectionFn(err: any): void {
    if (typeof console !== 'undefined' && console) {
      console.log('[jsfwk.error  ] Possible Unhandled Promise Rejection:', err);
    }
  };
}

function handle<T>(self: Promise<T>, deferred: HandlerClass<T>): void {
  while ((self as any)._state === 3) {
    self = (self as any)._value;
  }
  if ((self as any)._state === 0) {
    (self as any)._deferreds.push(deferred);
    return;
  }
  (self as any)._handled = true;
  Promise._immediateFn(() => {
    const cb = (self as any)._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      ((self as any)._state === 1 ? resolve : reject)(deferred.promise, (self as any)._value);
      return;
    }
    let ret;
    try {
      ret = cb((self as any)._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self: any, newValue: any): void {
  try {
    if (newValue === self) {
      throw new TypeError('A promise cannot be resolved with itself.');
    }
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      const then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self: any, newValue: any): void {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self: any): void {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(() => {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (let i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

class HandlerClass<T> implements Handler<T> {
  onFulfilled: ((value: T) => any) | null;
  onRejected: ((reason: any) => any) | null;
  promise: Promise<any>;

  constructor(onFulfilled: ((value: T) => any) | null, onRejected: ((reason: any) => any) | null, promise: Promise<any>) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }
}

function doResolve(fn: Function, self: any): void {
  let done = false;
  try {
    fn(
      function(value: any) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason: any) {
        if (done) return;
        done = true;
        reject(self, reason);
      },
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

// Expose Promise to the global scope
const globalNS = (function(): any {
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
})();

globalNS['Promise'] = Promise;

export { Promise }; 