import './buffer';
import './logger';
import { EventBus } from './event';
import { Deferred, timeout } from './defer';
import { json2Buf, buf2Json, buf2hex, bin2hex, bin2json, str2buf } from './data';
import { isHmBleDefined, isHmAppDefined } from './js-module';

let logger = DeviceRuntimeCore.HmLogger.getLogger(
  isHmAppDefined() ? 'device-message' : 'side-message'
);

const DEBUG = false;

export const MessageFlag = {
  App: 0x1,
} as const;

export const MessageType = {
  Shake: 0x1,
  Close: 0x2,
  Heart: 0x3,
  Data: 0x4,
  DataWithSystemTool: 0x5,
  Log: 0x6,
} as const;

export const MessageVersion = {
  Version1: 0x1,
} as const;

export const MessagePayloadType = {
  Request: 0x1,
  Response: 0x2,
  Notify: 0x3,
} as const;

export const MessagePayloadOpCode = {
  Continued: 0x0,
  Finished: 0x1,
} as const;

interface MessagePayload {
  traceId: number;
  parentId: number;
  spanId: number;
  seqId: number;
  totalLength: number;
  payloadLength: number;
  payloadType: number;
  opCode: number;
  timestamp1: number;
  timestamp2: number;
  timestamp3: number;
  timestamp4: number;
  timestamp5: number;
  timestamp6: number;
  timestamp7: number;
  timestamp8: number;
  extra1: number;
  extra2: number;
  payload: Buffer;
}

interface MessageData {
  flag: number;
  version: number;
  type: number;
  port1: number;
  port2: number;
  appId: number;
  extra: number;
  payload: Buffer;
}

interface MessageOptions {
  appId?: number;
  appDevicePort?: number;
  appSidePort?: number;
}

interface RequestOptions {
  timeout?: number;
}

interface SendDataWithSessionOptions {
  traceId: number;
  spanId: number;
  seqId: number;
  payload: Buffer;
  type: number;
  opCode: number;
  totalLength: number;
}

interface SendDataOptions {
  messageType?: typeof MessageType[keyof typeof MessageType];
}

interface SendSimpleDataOptions {
  payload: Buffer;
}

type EventCallback = (...args: any[]) => void;

let traceId = 10000;
export function genTraceId(): number {
  return traceId++;
}

let spanId = 1000;
export function genSpanId(): number {
  return spanId++;
}

export function getTimestamp(t: number = Date.now()): number {
  return t % 10000000;
}

class Session extends EventBus {
  private id: number;
  private type: number;
  private ctx: MessageBuilder;
  private tempBuf: Buffer | null;
  private chunks: MessagePayload[];
  private totalCount: number;
  private finishChunk: MessagePayload | null;

  constructor(id: number, type: number, ctx: MessageBuilder) {
    super();
    this.id = id;
    this.type = type;
    this.ctx = ctx;
    this.tempBuf = null;
    this.chunks = [];
    this.totalCount = 0;
    this.finishChunk = null;
  }

  getLength(): number {
    return this.tempBuf?.byteLength || 0;
  }

  addChunk(payload: MessagePayload): void {
    if (payload.opCode === MessagePayloadOpCode.Finished) {
      this.totalCount = payload.seqId;
      this.finishChunk = payload;
    }

    if (payload.payloadLength !== payload.payload.byteLength) {
      this.emit('error', Error(`receive chunk data length error, expect ${payload.payloadLength} but ${payload.payload.byteLength}`));
      return;
    }

    this.chunks.push(payload);
    this.checkIfReceiveAllChunks();
  }

  private checkIfReceiveAllChunks(): void {
    if (this.totalCount !== this.chunks.length) return;

    for (let i = 1; i <= this.totalCount; i++) {
      const chunk = this.chunks.find(c => c.seqId === i);

      if (!chunk) {
        this.releaseBuf();
        this.emit('error', Error('receive data error'));
        return;
      }

      const buf = chunk.payload;
      this.tempBuf = this.tempBuf ? Buffer.concat([this.tempBuf, buf]) : buf;
    }

    if (!this.finishChunk) return;

    this.finishChunk.payload = this.tempBuf!;
    this.finishChunk.payloadLength = this.finishChunk.payload.byteLength;

    if (this.finishChunk.totalLength !== this.finishChunk.payloadLength) {
      this.emit('error', Error(`receive full data length error, expect ${this.finishChunk.payloadLength} but ${this.finishChunk.payload.byteLength}`));
      return;
    }

    this.emit('data', this.finishChunk);
  }

  releaseBuf(): void {
    this.tempBuf = null;
    this.chunks = [];
    this.finishChunk = null;
    this.totalCount = 0;
  }

  getId(): number {
    return this.id;
  }

  getType(): number {
    return this.type;
  }
}

class SessionMgr {
  private sessions: Map<string, Session>;

  constructor() {
    this.sessions = new Map();
  }

  private key(session: { id: number; type: number }): string {
    return `${session.id}:${session.type}`;
  }

  newSession(id: number, type: number, ctx: MessageBuilder): Session {
    const newSession = new Session(id, type, ctx);
    this.sessions.set(this.key({ id, type }), newSession);
    return newSession;
  }

  destroy(session: Session): void {
    session.releaseBuf();
    this.sessions.delete(this.key({ 
      id: session.getId(),
      type: session.getType()
    }));
  }

  has(id: number, type: number): boolean {
    return this.sessions.has(this.key({ id, type }));
  }

  getById(id: number, type: number): Session | undefined {
    return this.sessions.get(this.key({ id, type }));
  }

  clear(): void {
    this.sessions.clear();
  }
}

export class MessageBuilder extends EventBus {
  private isDevice: boolean;
  private isSide: boolean;
  private appId: number;
  private appDevicePort: number;
  private appSidePort: number;
  private sendMsg: (buf: Buffer) => void;
  private chunkSize: number;
  private tempBuf: Buffer | null;
  private shakeTask: Deferred<void>;
  private waitingShakePromise: Promise<void>;
  private sessionMgr: SessionMgr;

  constructor({ appId = 0, appDevicePort = 20, appSidePort = 0 }: MessageOptions = {}) {
    super();
    this.isDevice = isHmBleDefined();
    this.isSide = !this.isDevice;
    this.appId = appId;
    this.appDevicePort = appDevicePort;
    this.appSidePort = appSidePort;
    this.sendMsg = this.getSafeSend();
    this.chunkSize = 2000;
    this.tempBuf = null;
    this.shakeTask = Deferred();
    this.waitingShakePromise = this.shakeTask.promise;
    this.sessionMgr = new SessionMgr();

    if (isHmAppDefined() && DEBUG) {
      logger.connect({
        log: (logEvent: any) => {
          this.log(JSON.stringify(logEvent));
        }
      });
    }
  }

  private now(t: number = Date.now()): number {
    return getTimestamp(t);
  }

  connect(cb?: (builder: MessageBuilder) => void): void {
    this.on('message', (message: Buffer) => {
      this.onMessage(message);
    });

    if (typeof hmBle !== 'undefined') {
      hmBle.createConnect((index?: number, data?: object, size?: number) => {
        console.log('createConnect-------', size);
        this.onFragmentData(data as ArrayBuffer);
      });
    }

    this.sendShake();
    cb?.(this);
  }

  disConnect(cb?: (builder: MessageBuilder) => void): void {
    this.sendClose();
    this.off('message');
    if (typeof hmBle !== 'undefined') {
      hmBle.disConnect();
    }
    cb?.(this);
  }

  listen(cb?: (builder: MessageBuilder) => void): void {
    if (typeof messaging !== 'undefined' && messaging.peerSocket) {
      messaging.peerSocket.addListener('message', (message: ArrayBuffer) => {
        this.onMessage(message);
      });
    }

    this.waitingShakePromise = Promise.resolve();
    cb?.(this);
  }

  private getSafeSend(): (buf: Buffer) => void {
    if (this.isDevice) {
      return this.sendBin.bind(this);
    } else {
      return this.sendBinBySide.bind(this);
    }
  }

  private sendBin(buf: Buffer): void {
    console.log('sendBin-------', buf.byteLength);
    if (typeof hmBle !== 'undefined') {
      hmBle.send(buf.buffer, buf.byteLength);
    }
  }

  private sendBinBySide(buf: Buffer): void {
    if (typeof messaging !== 'undefined' && messaging.peerSocket) {
      messaging.peerSocket.send(buf.buffer);
    }
  }

  private _logSend(buf: Buffer): void {
    if (this.isDevice) {
      hmBle.send(buf.buffer, buf.byteLength);
    } else {
      messaging.peerSocket.send(buf.buffer);
    }
  }

  private sendLog(str: string): void {
    const packageBuf = str2buf(str);
    this.sendSimpleProtocol({ dataBin: packageBuf }, { messageType: MessageType.Log });
  }

  private buildBin(data: MessageData): Buffer {
    const size = 16 + data.payload.byteLength;
    let buf = Buffer.alloc(size);
    let offset = 0;

    buf.writeUInt8(data.flag, offset);
    offset += 1;

    buf.writeUInt8(data.version, offset);
    offset += 1;

    buf.writeUInt16LE(data.type, offset);
    offset += 2;

    buf.writeUInt16LE(data.port1, offset);
    offset += 2;

    buf.writeUInt16LE(data.port2, offset);
    offset += 2;

    buf.writeUInt32LE(data.appId, offset);
    offset += 4;

    buf.writeUInt32LE(data.extra, offset);
    offset += 4;

    buf.fill(data.payload, offset, data.payload.byteLength + offset);

    return buf;
  }

  private buildShake(): Buffer {
    return this.buildBin({
      flag: MessageFlag.App,
      version: MessageVersion.Version1,
      type: MessageType.Shake,
      port1: this.appDevicePort,
      port2: this.appSidePort,
      appId: this.appId,
      extra: 0,
      payload: Buffer.from(new Uint8Array([this.appId])),
    });
  }

  private sendShake(): void {
    if (this.appSidePort === 0) {
      const shake = this.buildShake();
      this.sendMsg(shake);
    }
  }

  private buildClose(): Buffer {
    return this.buildBin({
      flag: MessageFlag.App,
      version: MessageVersion.Version1,
      type: MessageType.Close,
      port1: this.appDevicePort,
      port2: this.appSidePort,
      appId: this.appId,
      extra: 0,
      payload: Buffer.from(new Uint8Array([this.appId])),
    });
  }

  private sendClose(): void {
    if (this.appSidePort !== 0) {
      const close = this.buildClose();
      this.sendMsg(close);
    }
  }

  private onMessage(messagePayload: ArrayBuffer): void {
    const payload = this.readPayload(messagePayload);
    let session = this.sessionMgr.getById(payload.traceId, payload.payloadType);

    if (!session) {
      session = this.sessionMgr.newSession(payload.traceId, payload.payloadType, this);

      session.on('data', (fullPayload: MessagePayload) => {
        if (fullPayload.opCode === MessagePayloadOpCode.Finished) {
          if (fullPayload.payloadType === MessagePayloadType.Request) {
            this.emit('request', {
              request: fullPayload,
              response: ({ data }: { data: any }) => {
                this.response({ requestId: fullPayload.traceId, data });
              },
            });
          } else if (fullPayload.payloadType === MessagePayloadType.Response) {
            this.emit('response', fullPayload);
          } else if (fullPayload.payloadType === MessagePayloadType.Notify) {
            this.emit('call', fullPayload);
          }

          this.emit('data', fullPayload);
          this.sessionMgr.destroy(session!);
        }
      });

      session.on('error', (error: Error) => {
        this.sessionMgr.destroy(session!);
        this.emit('error', error);
      });
    }

    session.addChunk(payload);
  }

  private onFragmentData(bin: ArrayBuffer): void {
    const data = this.readBin(bin);
    this.emit('raw', bin);

    if (data.flag === MessageFlag.App && data.type === MessageType.Shake) {
      this.appSidePort = data.port2;
      this.shakeTask.resolve();
    } else if (
      data.flag === MessageFlag.App &&
      data.type === MessageType.Data &&
      data.port2 === this.appSidePort
    ) {
      this.emit('message', data.payload);
      this.emit('read', data);
    } else if (
      data.flag === MessageFlag.App &&
      data.type === MessageType.DataWithSystemTool &&
      data.port2 === this.appSidePort
    ) {
      this.emit('message', data.payload);
      this.emit('read', data);
    } else if (
      data.flag === MessageFlag.App &&
      data.type === MessageType.Log &&
      data.port2 === this.appSidePort
    ) {
      this.emit('log', data.payload);
    }
  }

  private readBin(arrayBuf: ArrayBuffer): MessageData {
    const buf = Buffer.from(arrayBuf);
    let offset = 0;

    const flag = buf.readUInt8(offset);
    offset += 1;

    const version = buf.readUInt8(offset);
    offset += 1;

    const type = buf.readUInt16LE(offset);
    offset += 2;

    const port1 = buf.readUInt16LE(offset);
    offset += 2;

    const port2 = buf.readUInt16LE(offset);
    offset += 2;

    const appId = buf.readUInt32LE(offset);
    offset += 4;

    const extra = buf.readUInt32LE(offset);
    offset += 4;

    const payload = buf.subarray(offset);

    return {
      flag,
      version,
      type,
      port1,
      port2,
      appId,
      extra,
      payload,
    };
  }

  private readPayload(arrayBuf: ArrayBuffer): MessagePayload {
    const buf = Buffer.from(arrayBuf);
    let offset = 0;

    const traceId = buf.readUInt32LE(offset);
    offset += 4;

    const parentId = buf.readUInt32LE(offset);
    offset += 4;

    const spanId = buf.readUInt32LE(offset);
    offset += 4;

    const seqId = buf.readUInt32LE(offset);
    offset += 4;

    const totalLength = buf.readUInt32LE(offset);
    offset += 4;

    const payloadLength = buf.readUInt32LE(offset);
    offset += 4;

    const payloadType = buf.readUInt8(offset);
    offset += 1;

    const opCode = buf.readUInt8(offset);
    offset += 1;

    const timestamp1 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp2 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp3 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp4 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp5 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp6 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp7 = buf.readUInt32LE(offset);
    offset += 4;

    const timestamp8 = buf.readUInt32LE(offset);
    offset += 4;

    const extra1 = buf.readUInt32LE(offset);
    offset += 4;

    const extra2 = buf.readUInt32LE(offset);
    offset += 4;

    const payload = buf.subarray(offset);

    return {
      traceId,
      parentId,
      spanId,
      seqId,
      totalLength,
      payloadLength,
      payloadType,
      opCode,
      timestamp1,
      timestamp2,
      timestamp3,
      timestamp4,
      timestamp5,
      timestamp6,
      timestamp7,
      timestamp8,
      extra1,
      extra2,
      payload,
    };
  }

  private sendJson({ requestId = 0, json, type = MessagePayloadType.Request }: { requestId?: number; json: any; type?: number }): void {
    const packageBin = json2Buf(json);
    const traceId = requestId ? requestId : genTraceId();
    this.sendHmProtocol({ requestId: traceId, dataBin: packageBin, type });
  }

  private sendHmProtocol({ requestId, dataBin, type }: { requestId?: number; dataBin: Buffer; type: number }, { messageType = MessageType.Data } = {}): void {
    const dataSize = this.chunkSize;
    const headerSize = 0;
    const userDataLength = dataBin.byteLength;

    let offset = 0;
    const _buf = Buffer.alloc(dataSize);
    const traceId = requestId ? requestId : genTraceId();
    const spanId = genSpanId();
    let seqId = 1;

    const count = Math.ceil(userDataLength / dataSize);

    const genSeqId = () => seqId++;

    for (let i = 1; i <= count; i++) {
      if (i === count) {
        const tailSize = userDataLength - offset;
        const tailBuf = Buffer.alloc(headerSize + tailSize);

        dataBin.copy(tailBuf, headerSize, offset, offset + tailSize);
        offset += tailSize;
        this.sendDataWithSession({
          traceId,
          spanId: spanId,
          seqId: genSeqId(),
          payload: tailBuf,
          type,
          opCode: MessagePayloadOpCode.Finished,
          totalLength: userDataLength,
        }, { messageType });

        break;
      }

      dataBin.copy(_buf, headerSize, offset, offset + dataSize);
      offset += dataSize;

      this.sendDataWithSession({
        traceId,
        spanId: spanId,
        seqId: genSeqId(),
        payload: _buf,
        type,
        opCode: MessagePayloadOpCode.Continued,
        totalLength: userDataLength,
      }, { messageType });
    }
  }

  private sendSimpleProtocol({ dataBin }: { dataBin: Buffer }, { messageType = MessageType.Data }: { messageType?: typeof MessageType[keyof typeof MessageType] } = {}): void {
    const dataSize = this.chunkSize;
    const headerSize = 0;
    const userDataLength = dataBin.byteLength;

    let offset = 0;
    const _buf = Buffer.alloc(dataSize);

    const count = Math.ceil(userDataLength / dataSize);

    for (let i = 1; i <= count; i++) {
      if (i === count) {
        const tailSize = userDataLength - offset;
        const tailBuf = Buffer.alloc(headerSize + tailSize);

        dataBin.copy(tailBuf, headerSize, offset, offset + tailSize);
        offset += tailSize;
        this.sendSimpleData({ payload: tailBuf }, { messageType });

        break;
      }

      dataBin.copy(_buf, headerSize, offset, offset + dataSize);
      offset += dataSize;

      this.sendSimpleData({ payload: _buf }, { messageType });
    }
  }

  private sendDataWithSession(data: SendDataWithSessionOptions, opts: SendDataOptions = {}): void {
    const payloadBin = this.buildPayload({
      traceId: data.traceId,
      spanId: data.spanId,
      seqId: data.seqId,
      totalLength: data.totalLength,
      type: data.type,
      opCode: data.opCode,
      payload: data.payload,
    });

    const messageData = this.isDevice ? this.buildData(payloadBin, { type: opts.messageType }) : payloadBin;
    this.sendMsg(messageData);
  }

  private buildData(payload: Buffer, opts: Partial<MessageData & { type: typeof MessageType[keyof typeof MessageType] }> = {}): Buffer {
    return this.buildBin({
      flag: MessageFlag.App,
      version: MessageVersion.Version1,
      type: MessageType.Data,
      port1: this.appDevicePort,
      port2: this.appSidePort,
      appId: this.appId,
      extra: 0,
      ...opts,
      payload,
    });
  }

  private sendSimpleData(data: SendSimpleDataOptions, opts: SendDataOptions = {}): void {
    const messageData = this.isDevice ? this.buildData(data.payload, { type: opts.messageType }) : data.payload;
    this._logSend(messageData);
  }

  private buildPayload(data: {
    traceId: number;
    spanId: number;
    seqId: number;
    totalLength: number;
    type: number;
    opCode: number;
    payload: Buffer;
  }): Buffer {
    const size = 66 + data.payload.byteLength;
    let buf = Buffer.alloc(size);
    let offset = 0;

    buf.writeUInt32LE(data.traceId, offset);
    offset += 4;

    // parentId
    buf.writeUInt32LE(0, offset);
    offset += 4;

    buf.writeUInt32LE(data.spanId, offset);
    offset += 4;

    buf.writeUInt32LE(data.seqId, offset);
    offset += 4;

    buf.writeUInt32LE(data.totalLength, offset);
    offset += 4;

    buf.writeUInt32LE(data.payload.byteLength, offset);
    offset += 4;

    buf.writeUInt8(data.type, offset);
    offset += 1;

    buf.writeUInt8(data.opCode, offset);
    offset += 1;

    buf.writeUInt32LE(this.now(), offset);
    offset += 4;

    // timestamps 2-8
    for (let i = 0; i < 7; i++) {
      buf.writeUInt32LE(0, offset);
      offset += 4;
    }

    // extra1 & extra2
    buf.writeUInt32LE(0, offset);
    offset += 4;
    buf.writeUInt32LE(0, offset);
    offset += 4;

    buf.fill(data.payload, offset, data.payload.byteLength + offset);

    return buf;
  }

  request(data: any, opts: RequestOptions = {}): Promise<any> {
    let hasConnected = false;
    const _request = () => {
      const defaultOpts = { timeout: 60000 };
      const requestId = genTraceId();
      const defer = Deferred<any>();
      opts = Object.assign(defaultOpts, opts);
      hasConnected = true;

      const error: EventCallback = (err: Error) => {
        this.off('error', error);
        defer.reject(err);
      };

      const transact = ({ traceId, payload }: { traceId: number; payload: Buffer }) => {
        if (traceId === requestId) {
          const resultJson = buf2Json(payload);
          this.off('response', transact);
          this.off('error', error);
          defer.resolve(resultJson);
        }
      };

      this.on('response', transact);
      this.on('error', error);
      this.sendJson({ requestId, json: data, type: MessagePayloadType.Request });

      let hasReturned = false;

      return Promise.race([
        timeout(opts.timeout!, (resolve, reject) => {
          if (hasReturned) {
            return resolve();
          }
          this.off('response', transact);
          reject(Error(`Timed out in ${opts.timeout}ms.`));
        }),
        defer.promise.finally(() => {
          hasReturned = true;
        }),
      ]);
    };

    return Promise.race([
      timeout(opts.timeout!, (_, reject) => {
        if(hasConnected) return;
        reject(new Error(`Disconnected`));
      }),
      this.waitingShakePromise.then(_request),
    ]);
  }

  requestCb(data: any, opts: RequestOptions | ((error: Error | null, result?: any) => void), cb?: (error: Error | null, result?: any) => void): Promise<void> {
    const _requestCb = () => {
      const defaultOpts = { timeout: 60000 };

      if (typeof opts === 'function') {
        cb = opts;
        opts = defaultOpts;
      } else {
        opts = Object.assign(defaultOpts, opts);
      }

      const requestId = genTraceId();
      let timer1: ReturnType<typeof setTimeout> | null = null;
      let hasReturned = false;

      const transact = ({ traceId, payload }: { traceId: number; payload: Buffer }) => {
        if (traceId === requestId) {
          const resultJson = buf2Json(payload);
          this.off('response', transact);
          if (timer1) {
            clearTimeout(timer1);
            timer1 = null;
          }
          hasReturned = true;
          cb!(null, resultJson);
        }
      };

      this.on('response', transact);
      this.sendJson({ requestId, json: data, type: MessagePayloadType.Request });

      timer1 = setTimeout(() => {
        timer1 = null;
        if (hasReturned) {
          return;
        }

        this.off('response', transact);
        cb!(Error(`Timed out in ${(opts as RequestOptions).timeout}ms.`));
      }, (opts as RequestOptions).timeout);
    };

    return this.waitingShakePromise.then(_requestCb);
  }

  response({ requestId, data }: { requestId: number; data: any }): void {
    this.sendJson({ requestId, json: data, type: MessagePayloadType.Response });
  }

  call(data: any): Promise<void> {
    return this.waitingShakePromise.then(() => {
      return this.sendJson({ json: data, type: MessagePayloadType.Notify });
    });
  }

  log(str: string): Promise<void> {
    return this.waitingShakePromise.then(() => {
      return this.sendLog(str);
    });
  }
}