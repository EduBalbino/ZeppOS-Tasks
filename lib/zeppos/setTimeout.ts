import { isHmTimerDefined } from './js-module';
import { getGlobal } from './global';

declare const timer: {
  createTimer: (delay: number, period: number, callback: () => void, options: object) => number;
  stopTimer: (timerRef: number) => void;
};

interface TimerFunctions {
  setTimeout: (callback: () => void, ms?: number) => number;
  clearTimeout: (handle: number) => void;
  setInterval: (callback: () => void, ms: number) => number;
  clearInterval: (handle: number) => void;
  setImmediate: (callback: () => void) => number;
  clearImmediate: (handle: number) => void;
}

declare global {
  interface Window extends TimerFunctions {}
}

const globalNS = getGlobal();

if (typeof setTimeout === 'undefined' && isHmTimerDefined()) {
  globalNS.clearTimeout = function clearTimeout(timerRef: number): void {
    timerRef && timer.stopTimer(timerRef);
  };

  globalNS.setTimeout = function setTimeout(func: () => void, ns?: number): number {
    const timer1 = timer.createTimer(
      ns || 1,
      Number.MAX_SAFE_INTEGER,
      function () {
        globalNS.clearTimeout(timer1);
        func && func();
      },
      {},
    );

    return timer1;
  };

  globalNS.clearImmediate = function clearImmediate(timerRef: number): void {
    timerRef && timer.stopTimer(timerRef);
  };

  globalNS.setImmediate = function setImmediate(func: () => void): number {
    const timer1 = timer.createTimer(
      1,
      Number.MAX_SAFE_INTEGER,
      function () {
        globalNS.clearImmediate(timer1);
        func && func();
      },
      {},
    );

    return timer1;
  };

  globalNS.clearInterval = function clearInterval(timerRef: number): void {
    timerRef && timer.stopTimer(timerRef);
  };

  globalNS.setInterval = function setInterval(func: () => void, ms: number): number {
    const timer1 = timer.createTimer(
      1,
      ms,
      function () {
        func && func();
      },
      {},
    );

    return timer1;
  };
} 