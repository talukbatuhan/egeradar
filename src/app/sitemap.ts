import type { MetadataRoute } from "next";
import { CATEGORIES, CITIES } from "@/lib/data/constants";
import { MOCK_ARTICLES, MOCK_TAGS } from "@/lib/data/mock";

const base = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...MOCK_TAGS.map((t) => ({
      url: `${root}/etiket/${t.slug}`,
      lastModified: new Date(),
    })),
    ...MOCK_ARTICLES.map((a) => ({
      url: `${root}/haber/${a.slug}`,
      lastModified: new Date(a.updated_at),
    })),
  ];
}
