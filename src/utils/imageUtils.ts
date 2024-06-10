export function getImageUrlFromBlob(blob: Blob): string {
  return URL.createObjectURL(blob);
}
