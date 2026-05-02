import type { MetadataRoute } from "next";
import { listAllTagSlugs, listPublishedArticlesForSitemap } from "@/lib/data/articles";
import { CATEGORIES, CITIES } from "@/lib/data/constants";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const base = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = base();
  const staticRoutes = [
    "",
    "/arama",
    "/canli",
    "/hakkimizda",
    "/iletisim",
    "/kunye",
    "/reklam",
    "/kvkk",
    "/cerez-politikasi",
    "/yayin-ilkeleri",
    "/confirm-newsletter",
  ].map((path) => ({
    url: `${root}${path}`,
    lastModified: new Date(),
  }));

  let tagRoutes: MetadataRoute.Sitemap = [];
  let articleRoutes: MetadataRoute.Sitemap = [];

  if (isSupabaseConfigured()) {
    try {
      const [tagRows, articleRows] = await Promise.all([listAllTagSlugs(), listPublishedArticlesForSitemap()]);
      tagRoutes = tagRows.map((t) => ({
        url: `${root}/etiket/${t.slug}`,
        lastModified: new Date(),
      }));
      articleRoutes = articleRows.map((a) => ({
        url: `${root}/haber/${a.slug}`,
        lastModified: a.published_at ? new Date(a.published_at) : new Date(),
      }));
    } catch {
      /* Supabase hatası */
    }
  }

  return [
    ...staticRoutes,
    ...CITIES.map((c) => ({
      url: `${root}/sehir/${c.slug}`,
      lastModified: new Date(),
    })),
    ...CATEGORIES.map((c) => ({
      url: `${root}/kategori/${c.slug}`,
      lastModified: new Date(),
    })),
    ...tagRoutes,
    ...articleRoutes,
  ];
}
