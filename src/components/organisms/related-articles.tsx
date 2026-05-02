import { NewsCard } from "@/components/molecules/news-card";
import type { ArticleWithRelations } from "@/lib/types";

export function RelatedArticles({ articles }: { articles: ArticleWithRelations[] }) {
  if (!articles.length) return null;
  return (
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-heading text-2xl font-extrabold">
        İlgili haberler
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} variant="featured" />
        ))}
      </div>
    </section>
  );
}
