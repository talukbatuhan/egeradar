import { NextResponse } from "next/server";
import { getHomeArticles } from "@/lib/data/articles";

export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const articles = await getHomeArticles();
  const latest = articles.slice(0, 30);

  const items = latest
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${base}/haber/${a.slug}</link>
      <guid>${base}/haber/${a.slug}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <description><![CDATA[${a.spot}]]></description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ege Radar</title>
    <link>${base}</link>
    <description>Ege bölgesi haberleri</description>
    <language>tr-tr</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
