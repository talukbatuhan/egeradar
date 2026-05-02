import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ArticleWithRelations } from "@/lib/types";
import { MOCK_ARTICLES } from "./mock";
import { categoryBySlug, cityBySlug } from "./constants";

const articleSelect = `
  *,
  author:authors (*),
  article_categories ( category:categories (*) ),
  article_cities ( city:cities (*) ),
  article_tags ( tag:tags (*) )
`;

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithRelations | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_ARTICLES.find((a) => a.slug === slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return MOCK_ARTICLES.find((a) => a.slug === slug) ?? null;
    return mapArticleRow(data as ArticleRow);
  } catch {
    return MOCK_ARTICLES.find((a) => a.slug === slug) ?? null;
  }
}

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  spot: string;
  body_mdx: string;
  hero_image_url: string;
  hero_alt: string;
  author_id: string;
  status: string;
  published_at: string;
  updated_at: string;
  view_count: number;
  reading_time_min: number;
  is_featured: boolean;
  is_breaking: boolean;
  author: Record<string, unknown>;
  article_categories: { category: Record<string, unknown> }[];
  article_cities: { city: Record<string, unknown> }[];
  article_tags: { tag: Record<string, unknown> }[];
};

function mapArticleRow(row: ArticleRow): ArticleWithRelations {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    spot: row.spot,
    body_mdx: row.body_mdx,
    hero_image_url: row.hero_image_url,
    hero_alt: row.hero_alt,
    author_id: row.author_id,
    status: row.status as ArticleWithRelations["status"],
    published_at: row.published_at,
    updated_at: row.updated_at,
    view_count: row.view_count,
    reading_time_min: row.reading_time_min,
    is_featured: row.is_featured,
    is_breaking: row.is_breaking,
    author: row.author as ArticleWithRelations["author"],
    categories: (row.article_categories ?? [])
      .map((ac) => ac.category)
      .filter(Boolean) as ArticleWithRelations["categories"],
    cities: (row.article_cities ?? [])
      .map((ac) => ac.city)
      .filter(Boolean) as ArticleWithRelations["cities"],
    tags: (row.article_tags ?? [])
      .map((at) => at.tag)
      .filter(Boolean) as ArticleWithRelations["tags"],
  };
}

export async function getHomeArticles(): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_ARTICLES].sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(40);

    if (error || !data?.length) return getHomeArticlesMock();
    return data.map((row) => mapArticleRow(row as ArticleRow));
  } catch {
    return getHomeArticlesMock();
  }
}

function getHomeArticlesMock(): ArticleWithRelations[] {
  return [...MOCK_ARTICLES].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function getArticlesByCitySlug(
  citySlug: string
): Promise<ArticleWithRelations[]> {
  const city = cityBySlug(citySlug);
  if (!city) return [];

  if (!isSupabaseConfigured()) {
    return MOCK_ARTICLES.filter((a) => a.cities.some((c) => c.slug === citySlug));
  }
  try {
    const supabase = await createClient();
    const { data: cityRow } = await supabase
      .from("cities")
      .select("id")
      .eq("slug", citySlug)
      .maybeSingle();
    if (!cityRow?.id) {
      return MOCK_ARTICLES.filter((a) =>
        a.cities.some((c) => c.slug === citySlug)
      );
    }
    const { data: links } = await supabase
      .from("article_cities")
      .select("article_id")
      .eq("city_id", cityRow.id);
    const ids = (links ?? []).map((l) => l.article_id);
    if (!ids.length) {
      return MOCK_ARTICLES.filter((a) =>
        a.cities.some((c) => c.slug === citySlug)
      );
    }
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .in("id", ids)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return MOCK_ARTICLES.filter((a) =>
        a.cities.some((c) => c.slug === citySlug)
      );
    }
    return data.map((row) => mapArticleRow(row as ArticleRow));
  } catch {
    return MOCK_ARTICLES.filter((a) => a.cities.some((c) => c.slug === citySlug));
  }
}

export async function getArticlesByCategorySlug(
  categorySlug: string
): Promise<ArticleWithRelations[]> {
  const cat = categoryBySlug(categorySlug);
  if (!cat) return [];

  if (!isSupabaseConfigured()) {
    return MOCK_ARTICLES.filter((a) =>
      a.categories.some((c) => c.slug === categorySlug)
    );
  }
  try {
    const supabase = await createClient();
    const { data: catRow } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();
    if (!catRow?.id) {
      return MOCK_ARTICLES.filter((a) =>
        a.categories.some((c) => c.slug === categorySlug)
      );
    }
    const { data: links } = await supabase
      .from("article_categories")
      .select("article_id")
      .eq("category_id", catRow.id);
    const ids = (links ?? []).map((l) => l.article_id);
    if (!ids.length) {
      return MOCK_ARTICLES.filter((a) =>
        a.categories.some((c) => c.slug === categorySlug)
      );
    }
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .in("id", ids)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return MOCK_ARTICLES.filter((a) =>
        a.categories.some((c) => c.slug === categorySlug)
      );
    }
    return data.map((row) => mapArticleRow(row as ArticleRow));
  } catch {
    return MOCK_ARTICLES.filter((a) =>
      a.categories.some((c) => c.slug === categorySlug)
    );
  }
}

export async function getArticlesByTagSlug(
  tagSlug: string
): Promise<ArticleWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_ARTICLES.filter((a) => a.tags.some((t) => t.slug === tagSlug));
  }
  try {
    const supabase = await createClient();
    const { data: tagRow } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", tagSlug)
      .maybeSingle();
    if (!tagRow) {
      return MOCK_ARTICLES.filter((a) =>
        a.tags.some((t) => t.slug === tagSlug)
      );
    }
    const { data: links } = await supabase
      .from("article_tags")
      .select("article_id")
      .eq("tag_id", tagRow.id);
    const ids = (links ?? []).map((l) => l.article_id);
    if (!ids.length) {
      return MOCK_ARTICLES.filter((a) => a.tags.some((t) => t.slug === tagSlug));
    }
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .in("id", ids)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return MOCK_ARTICLES.filter((a) => a.tags.some((t) => t.slug === tagSlug));
    }
    return data.map((row) => mapArticleRow(row as ArticleRow));
  } catch {
    return MOCK_ARTICLES.filter((a) => a.tags.some((t) => t.slug === tagSlug));
  }
}

export async function getTrendingArticles(
  limit = 10
): Promise<ArticleWithRelations[]> {
  const sorted = [...MOCK_ARTICLES].sort((a, b) => b.view_count - a.view_count);
  return sorted.slice(0, limit);
}

export async function getRelatedArticles(
  article: ArticleWithRelations,
  limit = 6
): Promise<ArticleWithRelations[]> {
  const sameCity = article.cities[0]?.slug;
  const sameCat = article.categories[0]?.slug;

  const scored = MOCK_ARTICLES.filter((a) => a.id !== article.id).map((a) => {
    let score = 0;
    if (sameCity && a.cities.some((c) => c.slug === sameCity)) score += 3;
    if (sameCat && a.categories.some((c) => c.slug === sameCat)) score += 2;
    score += Math.min(a.view_count / 10000, 1);
    return { a, score };
  });

  scored.sort((x, y) => y.score - x.score);
  return scored.slice(0, limit).map((s) => s.a);
}

export async function searchArticlesLocal(
  q: string,
  filters?: { categorySlug?: string; citySlug?: string }
): Promise<ArticleWithRelations[]> {
  const term = q.trim().toLowerCase();
  if (!term) return [];

  return MOCK_ARTICLES.filter((a) => {
    const hay = `${a.title} ${a.spot}`.toLowerCase();
    const match = hay.includes(term);
    if (!match) return false;
    if (
      filters?.categorySlug &&
      !a.categories.some((c) => c.slug === filters.categorySlug)
    )
      return false;
    if (
      filters?.citySlug &&
      !a.cities.some((c) => c.slug === filters.citySlug)
    )
      return false;
    return true;
  });
}

/** Kronolojik akışta bir sonraki (daha eski) haber — liste yeniden eskiye sıralı */
export function getNextArticleAfter(
  current: ArticleWithRelations
): ArticleWithRelations | null {
  const sorted = [...MOCK_ARTICLES].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const idx = sorted.findIndex((a) => a.id === current.id);
  if (idx === -1) return null;
  return sorted[idx + 1] ?? null;
}
