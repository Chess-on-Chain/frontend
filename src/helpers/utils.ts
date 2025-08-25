import { apiGetFile } from "./api";

export function dataURLToUint8Array(dataUrl: string) {
  // 1. pisahkan header dan data
  const base64 = dataUrl.split(",")[1];

  // 2. decode base64 jadi string biner
  const binaryStr = atob(base64);

  // 3. ubah jadi Uint8Array
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  return bytes;
}

export async function getCacheFile(file_id: string) {
  const key = "image_" + file_id;
  const cacheImage = localStorage.getItem(key);
  if (cacheImage) {
    return cacheImage;
  }

  const image = await apiGetFile(file_id);
  localStorage.setItem(key, image);
  return image;
}

// helper aman untuk mengubah payload pusher ke ArrayBuffer
export function toArrayBuffer(data: any): ArrayBuffer {
  if (data instanceof Uint8Array) {
    return data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength
    ) as ArrayBuffer;
  }

  if (Array.isArray(data)) {
    return new Uint8Array(data as number[]).buffer as ArrayBuffer;
  }

  if (typeof data === "string") {
    // Kalau ternyata dikirim base64 string
    const bin = atob(data);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer as ArrayBuffer;
  }

  if (data && typeof data === "object") {
    return new Uint8Array(Object.values(data) as number[]).buffer as ArrayBuffer;
  }

  throw new Error("Unsupported websocket payload format");
}
