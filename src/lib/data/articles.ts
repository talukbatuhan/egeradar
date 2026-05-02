import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ArticleWithRelations, Author, Category, City, Tag } from "@/lib/types";
import { categoryBySlug, cityBySlug } from "./constants";

/** Şemada yazar yok; UI ve JSON-LD için nötr kurumsal satır. */
const PLACEHOLDER_AUTHOR: Author = {
  id: "00000000-0000-4000-8000-000000000001",
  slug: "egeradar",
  name: "EgeRadar",
  bio: null,
  avatar_url: null,
  role: null,
  social_links: null,
};

const CORE_SELECT = `
  id,
  slug,
  title,
  summary,
  content,
  status,
  published_at,
  featured_image,
  category:categories(id, slug, name),
  city:cities(id, slug, name),
  article_tags(tag:tags(id, slug, name))
`;

type CategoryRow = { id: string; slug: string; name: string };
type CityRow = { id: string; slug: string; name: string };
type TagRow = { id: string; slug: string; name: string };

export type CoreArticleRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: string;
  published_at: string | null;
  featured_image: string;
  category: CategoryRow | CategoryRow[] | null;
  city: CityRow | CityRow[] | null;
  article_tags: { tag: TagRow | null }[] | null;
};

function one<T>(v: T | T[] | null | undefined): T | null {
  if (v == null) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function mapDbCategory(row: CategoryRow): Category {
  const fromConstants = categoryBySlug(row.slug);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: fromConstants?.description ?? null,
    icon: fromConstants?.icon ?? null,
    parent_id: fromConstants?.parent_id ?? null,
  };
}

function mapDbCity(row: CityRow): City {
  const fromConstants = cityBySlug(row.slug);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    plate_code: fromConstants?.plate_code ?? "",
  };
}

function readingTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wc = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(wc / 200));
}

export function mapCoreArticleRow(row: CoreArticleRow): ArticleWithRelations {
  const published = row.published_at ?? new Date().toISOString();
  const tags: Tag[] = (row.article_tags ?? [])
    .map((x) => x.tag)
    .filter((t): t is TagRow => Boolean(t))
    .map((t) => ({ id: t.id, slug: t.slug, name: t.name }));

  const hero =
    row.featured_image?.trim() ||
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80";

  const cat = one(row.category);
  const city = one(row.city);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    spot: row.summary,
    body_mdx: row.content,
    hero_image_url: hero,
    hero_alt: row.title,
    author_id: PLACEHOLDER_AUTHOR.id,
    status: row.status as ArticleWithRelations["status"],
    published_at: published,
    updated_at: published,
    view_count: 0,
    reading_time_min: readingTimeFromHtml(row.content),
    is_featured: false,
    is_breaking: false,
    author: PLACEHOLDER_AUTHOR,
    categories: cat ? [mapDbCategory(cat)] : [],
    cities: city ? [mapDbCity(city)] : [],
    tags,
  };
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("tags").select("id, slug, name").eq("slug", slug).maybeSingle();
    if (error || !data) return null;
    return { id: data.id, slug: data.slug, name: data.name };
  } catch {
    return null;
  }
}

export async function listPublishedArticleSlugs(): Promise<{ slug: string }[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("articles").select("slug").eq("status", "published");
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function listPublishedArticlesForSitemap(): Promise<
  { slug: string; published_at: string | null }[]
> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("slug, published_at")
      .eq("status", "published");
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function listAllTagSlugs(): Promise<{ slug: string }[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("tags").select("slug");
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return mapCoreArticleRow(data as unknown as CoreArticleRow);
  } catch {
    return null;
  }
}

export async function getHomeArticles(): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(40);

    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getArticlesByCitySlug(citySlug: string): Promise<ArticleWithRelations[]> {
  if (!cityBySlug(citySlug)) return [];
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data: cityRow } = await supabase.from("cities").select("id").eq("slug", citySlug).maybeSingle();
    if (!cityRow?.id) return [];

    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("city_id", cityRow.id)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getArticlesByCategorySlug(categorySlug: string): Promise<ArticleWithRelations[]> {
  if (!categoryBySlug(categorySlug)) return [];
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data: catRow } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
    if (!catRow?.id) return [];

    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("category_id", catRow.id)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getArticlesByTagSlug(tagSlug: string): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data: tagRow } = await supabase.from("tags").select("id").eq("slug", tagSlug).maybeSingle();
    if (!tagRow?.id) return [];

    const { data: links } = await supabase.from("article_tags").select("article_id").eq("tag_id", tagRow.id);
    const ids = (links ?? []).map((l) => l.article_id);
    if (!ids.length) return [];

    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .in("id", ids)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getTrendingArticles(limit = 10): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getRelatedArticles(
  article: ArticleWithRelations,
  limit = 6
): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) return [];

  const catId = article.categories[0]?.id;
  const cityId = article.cities[0]?.id;
  if (!catId && !cityId) return [];

  try {
    const supabase = await createClient();
    let q = supabase.from("articles").select(CORE_SELECT).eq("status", "published").neq("id", article.id);

    if (catId && cityId) {
      q = q.or(`category_id.eq.${catId},city_id.eq.${cityId}`);
    } else if (catId) {
      q = q.eq("category_id", catId);
    } else {
      q = q.eq("city_id", cityId!);
    }

    const { data, error } = await q.order("published_at", { ascending: false }).limit(limit);
    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function searchArticlesLocal(
  q: string,
  filters?: { categorySlug?: string; citySlug?: string }
): Promise<ArticleWithRelations[]> {
  const term = q.trim().replace(/[%_,]/g, "").slice(0, 120);
  if (!term || !isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const pattern = `%${term}%`;

    let categoryId: string | undefined;
    let cityId: string | undefined;
    if (filters?.categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", filters.categorySlug)
        .maybeSingle();
      categoryId = cat?.id;
    }
    if (filters?.citySlug) {
      const { data: city } = await supabase.from("cities").select("id").eq("slug", filters.citySlug).maybeSingle();
      cityId = city?.id;
    }

    let query = supabase
      .from("articles")
      .select(CORE_SELECT)
      .eq("status", "published")
      .or(`title.ilike.${pattern},summary.ilike.${pattern}`);

    if (categoryId) query = query.eq("category_id", categoryId);
    if (cityId) query = query.eq("city_id", cityId);

    const { data, error } = await query.order("published_at", { ascending: false }).limit(60);
    if (error || !data?.length) return [];
    return data.map((row) => mapCoreArticleRow(row as unknown as CoreArticleRow));
  } catch {
    return [];
  }
}

export async function getNextArticleAfter(
  current: ArticleWithRelations
): Promise<ArticleWithRelations | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return null;
    const idx = data.findIndex((r) => r.id === current.id);
    const next = idx >= 0 ? data[idx + 1] : null;
    if (!next?.slug) return null;
    const full = await getArticleBySlug(next.slug);
    return full;
  } catch {
    return null;
  }
}
