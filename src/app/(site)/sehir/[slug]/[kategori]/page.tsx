import { notFound } from "next/navigation";
import { ArchiveSection } from "@/components/templates/archive-section";
import {
  getArticlesByCitySlug,
  getTrendingArticles,
} from "@/lib/data/articles";
import { categoryBySlug, cityBySlug } from "@/lib/data/constants";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string; kategori: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CityCategoryArchivePage({ params, searchParams }: Props) {
  const { slug, kategori } = await params;
  const { page: pageStr } = await searchParams;

  const city = cityBySlug(slug);
  const cat = categoryBySlug(kategori);
  if (!city || !cat) notFound();

  let articles = await getArticlesByCitySlug(slug);
  articles = articles.filter((a) => a.categories.some((c) => c.slug === kategori));

  const popular = await getTrendingArticles(5);
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const title = `${city.name} · ${cat.name}`;
  const description = `${city.name} ilinden ${cat.name} haberleri.`;

  return (
    <ArchiveSection
      title={title}
      description={description}
      basePath={`/sehir/${slug}/${kategori}`}
      articles={articles}
      page={page}
      sidebarPopular={popular}
    />
  );
}
