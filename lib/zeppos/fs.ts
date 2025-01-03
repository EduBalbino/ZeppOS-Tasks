declare const DeviceRuntimeCore: {
  HmLogger: {
    getLogger: (name: string) => {
      log: (...args: any[]) => void;
    };
  };
};

declare const hmFS: {
  O_RDONLY: number;
  O_WRONLY: number;
  O_RDWR: number;
  O_APPEND: number;
  O_CREAT: number;
  O_TRUNC: number;
  SEEK_SET: number;
  stat: (path: string) => [FileStat, number];
  open: (path: string, flags: number) => number;
  close: (fd: number) => void;
  write: (fd: number, buffer: ArrayBuffer, offset: number, length: number) => number;
  read: (fd: number, buffer: ArrayBuffer, offset: number, length: number) => number;
  seek: (fd: number, offset: number, whence: number) => void;
  remove: (path: string) => number;
  rename: (oldPath: string, newPath: string) => void;
  mkdir: (path: string) => void;
  readdir: (path: string) => string[];
};

interface FileStat {
  size: number;
  mtime: number;
  isDirectory: boolean;
}

interface FileOptions {
  encoding?: string;
  flag?: string;
}

const logger = DeviceRuntimeCore.HmLogger.getLogger('fs.js');

function ab2str(buf: ArrayBuffer): string {
  const uint16Array = new Uint16Array(buf);
  return String.fromCharCode.apply(null, Array.from(uint16Array));
}

function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * Get metadata of a file.
 */
export function statSync(filename: string): FileStat | null {
  logger.log('statSync', filename);
  //获取文件信息
  const [fs_stat, err] = hmFS.stat(filename);
  logger.log('res', fs_stat, err);
  if (err === 0) {
    logger.log('fs--->size:', fs_stat.size);
    return fs_stat;
  } else {
    logger.log('fs--->err:', err);
    return null;
  }
}

/**
 * Write data to a file in a single operation. If a file with that name already exists, it is overwritten; otherwise, a new file is created.
 */
export function writeFileSync(filename: string, data: string, options?: FileOptions): void {
  logger.log('writeFileSync begin -->', filename);

  const stringBuffer = str2ab(data);
  const source_buf = new Uint8Array(stringBuffer);

  //打开/创建文件
  const file = hmFS.open(filename, hmFS.O_CREAT | hmFS.O_RDWR | hmFS.O_TRUNC);
  logger.log('writeFileSync file open success -->', file);
  //定位到文件开始位置
  hmFS.seek(file, 0, hmFS.SEEK_SET);
  //写入buffer
  hmFS.write(file, source_buf.buffer, 0, source_buf.length);
  //关闭文件
  hmFS.close(file);
  logger.log('writeFileSync success -->', filename);
}

/**
 * Read an entire file into a buffer in a single operation.
 */
export function readFileSync(filename: string, options?: FileOptions): string | undefined {
  logger.log('readFileSync fiename:', filename);

  const fs_stat = statSync(filename);
  if (!fs_stat) return undefined;

  const destination_buf = new Uint8Array(fs_stat.size);
  //打开/创建文件
  const file = hmFS.open(filename, hmFS.O_RDONLY);
  //定位到文件开始位置
  hmFS.seek(file, 0, hmFS.SEEK_SET);
  //读取buffer
  hmFS.read(file, destination_buf.buffer, 0, fs_stat.size);
  //关闭文件
  hmFS.close(file);

  const content = ab2str(destination_buf.buffer);
  //读取结果打印
  logger.log('readFileSync', content);
  return content;
}

/**
 * Delete a file.
 */
export function unlinkSync(filename: string): number {
  logger.log('unlinkSync begin -->', filename);
  const result = hmFS.remove(filename);
  logger.log('unlinkSync result -->', result);
  return result;
}

/**
 * Rename a file.
 */
export function renameSync(oldFilename: string, newFilename: string): void {
  logger.log('renameSync begin -->', oldFilename);
  hmFS.rename(oldFilename, newFilename);
  logger.log('renameSync success -->', newFilename);
}

/**
 * Synchronously creates a directory.
 */
export function mkdirSync(path: string, options?: FileOptions): void {
  logger.log('mkdirSync begin -->', path);
  hmFS.mkdir(path);
  logger.log('mkdirSync success -->', path);
}

/**
 * Reads the contents of the directory.
 */
export function readdirSync(path: string, options?: FileOptions): string[] {
  logger.log('readdirSync begin -->', path);
  const result = hmFS.readdir(path);
  logger.log('readdirSync success -->', path);
  return result;
}

/**
 * Just to test the fs module
 */
export function test(fileName: string, dataString: string): void {
  logger.log('saveData begin');

  writeFileSync(fileName, dataString);

  logger.log('fs_writeFileSync -> ', dataString);

  const content = readFileSync(fileName);

  logger.log('fs_readFileSync -> ', content);
} 