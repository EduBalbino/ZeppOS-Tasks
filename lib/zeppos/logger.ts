import { getGlobal } from './global';

interface LoggerInstance {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  connect?(config: { log: (event: any) => void }): void;
}

interface LoggerConstructor {
  getLogger(name: string): LoggerInstance;
}

declare const DeviceRuntimeCore: {
  HmLogger: LoggerConstructor;
};

const globalNS = getGlobal();

if (!globalNS.Logger) {
  if (typeof DeviceRuntimeCore !== 'undefined') {
    globalNS.Logger = DeviceRuntimeCore.HmLogger;
  } else {
    // Fallback to console if Logger is not defined
    const consoleLogger: LoggerInstance = {
      log: console.log.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      connect: () => {
        // pass
      }
    };

    globalNS.Logger = {
      getLogger: () => consoleLogger
    };
  }
} 