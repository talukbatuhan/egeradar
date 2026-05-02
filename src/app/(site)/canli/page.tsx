import Link from "next/link";
import { getHomeArticles } from "@/lib/data/articles";
import { categoryBySlug } from "@/lib/data/constants";

export const metadata = { title: "Son dakika" };

type Props = { searchParams: Promise<{ kategori?: string }> };

export default async function LiveFeedPage({ searchParams }: Props) {
  const { kategori: kategoriRaw } = await searchParams;
  const kategoriSlug =
    kategoriRaw && categoryBySlug(kategoriRaw) ? kategoriRaw : undefined;
  const cat = kategoriSlug ? categoryBySlug(kategoriSlug) : undefined;

  let articles = await getHomeArticles();
  if (kategoriSlug) {
    articles = articles.filter((a) =>
      a.categories.some((c) => c.slug === kategoriSlug)
    );
  }

  return (
    <div className="container-site py-10 lg:py-14">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight">
        Son dakika
        {cat ? (
          <span className="block text-2xl font-semibold text-foreground-muted">
            {cat.name}
          </span>
        ) : null}
      </h1>
      <ul className="mt-8 space-y-4">
        {articles.slice(0, 8).map((a) => (
          <li key={a.id}>
            <Link
              href={`/haber/${a.slug}`}
              className="text-lg font-medium text-breaking hover:underline"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="font-heading mt-14 text-2xl font-bold">Son haberler</h2>
      <ul className="mt-4 space-y-3">
        {articles.slice(0, 15).map((a) => (
          <li key={a.id}>
            <Link href={`/haber/${a.slug}`} className="hover:underline">
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
