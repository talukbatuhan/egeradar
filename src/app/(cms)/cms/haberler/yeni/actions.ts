"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { slugifyTitle } from "@/lib/utils/slugify";
import { uploadArticleCoverImage } from "@/lib/storage/upload-article-image";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type CreateArticleState = {
  error: string | null;
  fieldErrors: Partial<
    Record<
      "title" | "summary" | "content" | "category_id" | "city_id" | "status" | "featured_image",
      string
    >
  >;
};

const initialFieldErrors: CreateArticleState["fieldErrors"] = {};

const articleFormSchema = z
  .object({
    title: z.string().trim().min(1, "Başlık zorunludur.").max(500, "Başlık en fazla 500 karakter."),
    summary: z.string().max(8000, "Özet çok uzun.").default(""),
    content: z.string().max(500_000, "İçerik çok uzun.").default(""),
    category_id: z.uuid("Geçerli bir kategori seçin."),
    city_id: z.uuid("Geçerli bir şehir seçin."),
    status: z.enum(["draft", "published"]),
    featured_image: z.custom<File | undefined>(
      (v) => v === undefined || (typeof File !== "undefined" && v instanceof File)
    ).optional(),
  })
  .superRefine((data, ctx) => {
    const f = data.featured_image;
    if (f && f.size > 0) {
      if (!f.type.startsWith("image/")) {
        ctx.addIssue({
          code: "custom",
          message: "Yalnızca resim dosyası yükleyebilirsiniz.",
          path: ["featured_image"],
        });
      }
      const max = 5 * 1024 * 1024;
      if (f.size > max) {
        ctx.addIssue({
          code: "custom",
          message: "Dosya en fazla 5 MB olabilir.",
          path: ["featured_image"],
        });
      }
    }
  });

function flattenFieldErrors(flat: z.ZodError): CreateArticleState["fieldErrors"] {
  const fe = flat.flatten().fieldErrors as Partial<
    Record<keyof CreateArticleState["fieldErrors"], string[] | undefined>
  >;
  return {
    title: fe.title?.[0],
    summary: fe.summary?.[0],
    content: fe.content?.[0],
    category_id: fe.category_id?.[0],
    city_id: fe.city_id?.[0],
    status: fe.status?.[0],
    featured_image: fe.featured_image?.[0],
  };
}

async function resolveUniqueSlug(supabase: Awaited<ReturnType<typeof createClient>>, base: string) {
  const root = base || "haber";
  for (let i = 0; i < 200; i++) {
    const candidate = i === 0 ? root : `${root}-${i}`;
    const { data, error } = await supabase.from("articles").select("id").eq("slug", candidate).maybeSingle();
    if (error) return `${root}-${randomUUID().slice(0, 8)}`;
    if (!data) return candidate;
  }
  return `${root}-${randomUUID().slice(0, 8)}`;
}

export async function createArticle(
  _prev: CreateArticleState,
  formData: FormData
): Promise<CreateArticleState> {
  const featuredEntry = formData.get("featured_image");
  const featuredImage =
    featuredEntry instanceof File && featuredEntry.size > 0 ? featuredEntry : undefined;

  const raw = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    category_id: formData.get("category_id"),
    city_id: formData.get("city_id"),
    status: formData.get("status"),
    featured_image: featuredImage,
  };

  const parsed = articleFormSchema.safeParse({
    title: typeof raw.title === "string" ? raw.title : "",
    summary: typeof raw.summary === "string" ? raw.summary : "",
    content: typeof raw.content === "string" ? raw.content : "",
    category_id: typeof raw.category_id === "string" ? raw.category_id : "",
    city_id: typeof raw.city_id === "string" ? raw.city_id : "",
    status: typeof raw.status === "string" ? raw.status : "",
    featured_image: featuredImage,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().formErrors[0] ?? "Doğrulama hatası.",
      fieldErrors: flattenFieldErrors(parsed.error),
    };
  }

  if (!isSupabaseConfigured()) {
    return { error: "Supabase yapılandırılmadı (.env.local).", fieldErrors: initialFieldErrors };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: "Supabase istemcisi oluşturulamadı.", fieldErrors: initialFieldErrors };
  }

  let featuredUrl = "";
  if (parsed.data.featured_image && parsed.data.featured_image.size > 0) {
    const up = await uploadArticleCoverImage(supabase, parsed.data.featured_image);
    if (!up.ok) {
      return {
        error: up.message,
        fieldErrors: { featured_image: up.message },
      };
    }
    featuredUrl = up.publicUrl;
  }

  const baseSlug = slugifyTitle(parsed.data.title);
  const slug = await resolveUniqueSlug(supabase, baseSlug);
  const publishedAt = parsed.data.status === "published" ? new Date().toISOString() : null;

  const { error: insertError } = await supabase.from("articles").insert({
    slug,
    title: parsed.data.title,
    summary: parsed.data.summary,
    content: parsed.data.content,
    status: parsed.data.status,
    category_id: parsed.data.category_id,
    city_id: parsed.data.city_id,
    featured_image: featuredUrl,
    published_at: publishedAt,
  });

  if (insertError) {
    return {
      error: insertError.message || "Kayıt sırasında bir hata oluştu.",
      fieldErrors: initialFieldErrors,
    };
  }

  redirect("/cms/haberler");
}
