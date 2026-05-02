import { notFound } from "next/navigation";
import { ArchiveSection } from "@/components/templates/archive-section";
import {
  getArticlesByTagSlug,
  getTrendingArticles,
} from "@/lib/data/articles";
import { MOCK_TAGS } from "@/lib/data/mock";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function TagArchivePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const tag = MOCK_TAGS.find((t) => t.slug === slug);
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
