const str = (): string => ('00000000000000000' + (Math.random() * 0xffffffffffffffff).toString(16)).slice(-16);

export function generateUUID(): string {
  const a: string = str();
  const b: string = str();
  return a.slice(0, 8) + '-' + a.slice(8, 12) + '-4' + a.slice(13) + '-a' + b.slice(1, 4) + '-' + b.slice(4);
} 