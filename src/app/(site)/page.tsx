import { AdSlot } from "@/components/organisms/ad-slot";
import { CategoryNewsBlock } from "@/components/organisms/category-news-block";
import { HomeTripleGrid } from "@/components/molecules/home-triple-grid";
import { getHomeArticles } from "@/lib/data/articles";
import { HOME_AD_SPACING, HOME_CONTENT_GUTTER } from "@/lib/ui/home-page-layout";

export const revalidate = 60;

const CATEGORY_BLOCKS = [
  { sectionId: "home-block-gundem", categoryName: "Gündem", headerColor: "bg-red-600", slug: "gundem" },
  { sectionId: "home-block-ekonomi", categoryName: "Ekonomi", headerColor: "bg-emerald-700", slug: "ekonomi" },
  { sectionId: "home-block-spor", categoryName: "Spor", headerColor: "bg-blue-700", slug: "spor" },
  { sectionId: "home-block-turizm", categoryName: "Turizm", headerColor: "bg-sky-600", slug: "turizm" },
  { sectionId: "home-block-asayis", categoryName: "Asayiş", headerColor: "bg-slate-700", slug: "asayis" },
] as const;

export default async function HomePage() {
  const articles = await getHomeArticles();

  const gridArticles = articles.slice(0, 18);

  const byCategory = (slug: string) =>
    articles.filter((a) => a.categories.some((c) => c.slug === slug)).slice(0, 5);

  return (
    <div className="home-page">
      <h1 className="sr-only">Ege Radar — Ana sayfa</h1>

      {CATEGORY_BLOCKS.map((block) => (
        <CategoryNewsBlock
          key={block.sectionId}
          sectionId={block.sectionId}
          categoryName={block.categoryName}
          headerColor={block.headerColor}
          articles={byCategory(block.slug)}
          imagePriority={block.slug === "gundem"}
        />
      ))}

      <HomeTripleGrid articles={gridArticles} />

      <section className={HOME_AD_SPACING} aria-label="Reklam alanı">
        <div className={HOME_CONTENT_GUTTER}>
          <AdSlot id="home-below-hero" size="home-banner" className="mx-auto" />
        </div>
      </section>

      <section className={HOME_AD_SPACING} aria-label="Reklam alanı">
        <div className={HOME_CONTENT_GUTTER}>
          <AdSlot id="home-mpu-1" size="mpu" className="mx-auto" />
        </div>
      </section>

      <section className={HOME_AD_SPACING} aria-label="Reklam alanı">
        <div className={HOME_CONTENT_GUTTER}>
          <AdSlot id="home-billboard-1" size="billboard" />
        </div>
      </section>

      <section className="border-t border-border py-10 lg:hidden" aria-label="Mobil reklam">
        <div className={HOME_CONTENT_GUTTER}>
          <AdSlot id="home-sticky-mobile" size="sticky-bottom" />
        </div>
      </section>
    </div>
  );
}
