import { NextResponse } from "next/server";
import { getHomeArticles } from "@/lib/data/articles";

/** Google News — son 48 saat haberleri (örnek filtre) */
export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const articles = await getHomeArticles();
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const recent = articles.filter(
    (a) => new Date(a.published_at).getTime() > cutoff
  );

  const urls = recent
    .map(
      (a) => `
  <url>
    <loc>${base}/haber/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Ege Radar</news:name>
        <news:language>tr</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.published_at).toISOString().split("T")[0]}</news:publication_date>
      <news:title><![CDATA[${a.title}]]></news:title>
    </news:news>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
