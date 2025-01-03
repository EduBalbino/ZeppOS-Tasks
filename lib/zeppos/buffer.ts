import { getGlobal } from './global';
  
const globalNS = getGlobal();

if (!globalNS.Buffer) {
  if (typeof Buffer !== 'undefined') {
    globalNS.Buffer = Buffer;
  } else if (typeof DeviceRuntimeCore !== 'undefined') {
    globalNS.Buffer = DeviceRuntimeCore.Buffer;
  }
} 