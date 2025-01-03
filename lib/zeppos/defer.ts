export interface Deferred<T = void> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function Deferred<T = void>(): Deferred<T> {
  const defer = {} as Deferred<T>;

  defer.promise = new Promise<T>((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });

  return defer;
}

export function delay(ms: number): Promise<void> {
  const defer = Deferred<void>();

  setTimeout(defer.resolve, ms);

  return defer.promise;
}

export function timeout<T = void>(
  ms: number,
  cb?: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
): Promise<T> {
  const defer = Deferred<T>();
  ms = ms || 1000;

  const wait = setTimeout(() => {
    clearTimeout(wait);

    if (cb) {
      cb(defer.resolve, defer.reject);
    } else {
      defer.reject('Timed out in ' + ms + 'ms.');
    }
  }, ms);

  return defer.promise;
} 