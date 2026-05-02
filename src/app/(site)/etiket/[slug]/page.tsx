import { notFound } from "next/navigation";
import { ArchiveSection } from "@/components/templates/archive-section";
import {
  getArticlesByTagSlug,
  getTagBySlug,
  getTrendingArticles,
  listAllTagSlugs,
} from "@/lib/data/articles";

export const revalidate = 120;

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const rows = await listAllTagSlugs();
  return rows.map((r) => ({ slug: r.slug }));
}

export default async function TagArchivePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const articles = await getArticlesByTagSlug(slug);
  const popular = await getTrendingArticles(5);
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  return (
    <ArchiveSection
      title={`#${tag.name}`}
      description="Etiketle ilişkili haberler."
      basePath={`/etiket/${slug}`}
      articles={articles}
      page={page}
      sidebarPopular={popular}
    />
  );
}
