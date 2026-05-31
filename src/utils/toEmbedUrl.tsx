export function toEmbedUrl(url: string): string {
  if (!url) return "";

  // すでに embed URL の場合はそのまま返す
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  // watch?v= を embed/ に変換
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // youtu.be の短縮 URL にも対応
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }

  // それ以外はそのまま返す（安全策）
  return url;
}
