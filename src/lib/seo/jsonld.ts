import type { ArticleWithRelations } from "@/lib/types";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function newsArticleJsonLd(article: ArticleWithRelations) {
  const url = `${siteUrl}/haber/${article.slug}`;
  const section = article.categories[0]?.name ?? "Gündem";

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.spot,
    image: [article.hero_image_url],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Ege Radar",
      url: siteUrl,
    },
    articleSection: section,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
