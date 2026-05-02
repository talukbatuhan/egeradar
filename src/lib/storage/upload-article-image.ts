import type { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export const ARTICLE_IMAGES_BUCKET = "article-images" as const;

function extensionFromFile(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;
  const t = file.type;
  if (t === "image/jpeg") return "jpg";
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  if (t === "image/gif") return "gif";
  return "img";
}

/**
 * Kapak görselini `article-images` bucket'ına yükler ve public URL döner.
 */
export async function uploadArticleCoverImage(
  client: SupabaseClient,
  file: File
): Promise<{ ok: true; publicUrl: string } | { ok: false; message: string }> {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Geçersiz dosya." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, message: "Yalnızca resim dosyası yüklenebilir." };
  }

  const ext = extensionFromFile(file);
  const path = `covers/${randomUUID()}.${ext}`;
  const bytes = await file.arrayBuffer();
  const body = new Uint8Array(bytes);

  const { error } = await client.storage.from(ARTICLE_IMAGES_BUCKET).upload(path, body, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const { data } = client.storage.from(ARTICLE_IMAGES_BUCKET).getPublicUrl(path);
  return { ok: true, publicUrl: data.publicUrl };
}
