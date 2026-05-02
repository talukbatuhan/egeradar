/** İlk blok ve geri kalan — ara reklam yerleşimi için basit bölme */
export function splitArticleBody(source: string, firstBlockRatio = 0.45): [string, string] {
  const blocks = source.trim().split(/\n\n+/);
  if (blocks.length <= 2) return [source, ""];
  const splitAt = Math.max(2, Math.floor(blocks.length * firstBlockRatio));
  const first = blocks.slice(0, splitAt).join("\n\n");
  const rest = blocks.slice(splitAt).join("\n\n");
  return [first, rest];
}
