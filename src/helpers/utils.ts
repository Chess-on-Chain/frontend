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
