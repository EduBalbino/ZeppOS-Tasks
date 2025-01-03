type EventCallback = (...args: any[]) => void;

export class EventBus {
  private map: Map<string, EventCallback[]>;

  constructor() {
    this.map = new Map();
  }

  on(type: string, cb: EventCallback): void {
    if (this.map.has(type)) {
      this.map.get(type)!.push(cb);
    } else {
      this.map.set(type, [cb]);
    }
  }

  off(type?: string, cb?: EventCallback): void {
    if (type) {
      if (cb) {
        const cbs = this.map.get(type);

        if (!cbs) return;
        const index = cbs.findIndex((i) => i === cb);

        if (index >= 0) {
          cbs.splice(index, 1);
        }
      } else {
        this.map.delete(type);
      }
    } else {
      this.map.clear();
    }
  }

  emit(type: string, ...args: any[]): void {
    const callbacks = this.map.get(type) || [];
    for (const cb of callbacks) {
      cb?.(...args);
    }
  }

  count(type: string): number {
    return this.map.get(type) ? this.map.get(type)!.length : 0;
  }
}