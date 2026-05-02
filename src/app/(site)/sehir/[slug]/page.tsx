import { notFound } from "next/navigation";
import { ArchiveSection } from "@/components/templates/archive-section";
import {
  getArticlesByCitySlug,
  getTrendingArticles,
} from "@/lib/data/articles";
import { categoryBySlug, cityBySlug } from "@/lib/data/constants";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; kategori?: string }>;
};

export default async function CityArchivePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr, kategori: kategoriRaw } = await searchParams;
  const city = cityBySlug(slug);
  if (!city) notFound();

  const kategoriSlug =
    kategoriRaw && categoryBySlug(kategoriRaw) ? kategoriRaw : undefined;

  let articles = await getArticlesByCitySlug(slug);
  if (kategoriSlug) {
    articles = articles.filter((a) =>
      a.categories.some((c) => c.slug === kategoriSlug)
    );
  }

  const popular = await getTrendingArticles(5);
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const cat = kategoriSlug ? categoryBySlug(kategoriSlug) : undefined;

  const title = cat ? `${city.name} · ${cat.name}` : `${city.name} haberleri`;
  const description = cat
    ? `${city.name} ilinden ${cat.name} haberleri.`
    : `${city.plate_code} plaka kodlu ildeki son gelişmeler.`;

  return (
    <ArchiveSection
      title={title}
      description={description}
      basePath={`/sehir/${slug}`}
      extraSearchParams={cat ? { kategori: cat.slug } : undefined}
      articles={articles}
      page={page}
      sidebarPopular={popular}
    />
  );
}
