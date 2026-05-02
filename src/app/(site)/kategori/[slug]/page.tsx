import { notFound } from "next/navigation";
import { ArchiveSection } from "@/components/templates/archive-section";
import {
  getArticlesByCategorySlug,
  getTrendingArticles,
} from "@/lib/data/articles";
import { categoryBySlug } from "@/lib/data/constants";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CategoryArchivePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const articles = await getArticlesByCategorySlug(slug);
  const popular = await getTrendingArticles(5);
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  return (
    <ArchiveSection
      title={cat.name}
      description={cat.description ?? undefined}
      basePath={`/kategori/${slug}`}
      articles={articles}
      page={page}
      sidebarPopular={popular}
    />
  );
}
