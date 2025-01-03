export function json2Buf(json: any): Buffer {
  return str2buf(json2str(json));
}

export function len(binOrBuf: ArrayBuffer | Buffer): number {
  return binOrBuf.byteLength;
}

export function buf2Json(buf: Buffer): any {
  return str2json(buf2str(buf));
}

export function str2json(str: string): any {
  return JSON.parse(str);
}

export function json2str(json: any): string {
  return JSON.stringify(json);
}

export function str2buf(str: string): Buffer {
  return Buffer.from(str, 'utf-8');
}

export function buf2str(buf: Buffer): string {
  return buf.toString('utf-8');
}

export function bin2buf(bin: ArrayBuffer): Buffer {
  return Buffer.from(bin);
}

export function buf2bin(buf: Buffer): ArrayBuffer {
  return buf.buffer;
}

export function buf2hex(buf: Buffer): string {
  return buf.toString('hex');
}

export function bin2hex(bin: ArrayBuffer): string {
  return buf2hex(bin2buf(bin));
}

export function bin2json(bin: ArrayBuffer): any {
  return buf2Json(bin2buf(bin));
}

export function bin2str(bin: ArrayBuffer): string {
  return buf2str(bin2buf(bin));
}

export function str2bin(str: string): ArrayBuffer {
  return buf2bin(str2buf(str));
}

export function allocOfBin(size: number = 0): ArrayBuffer {
  return Buffer.alloc(size).buffer;
}

export function allocOfBuf(size: number = 0): Buffer {
  return Buffer.alloc(size);
} 