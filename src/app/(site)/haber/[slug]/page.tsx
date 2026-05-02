import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/mdx/article-body";
import { AdSlot } from "@/components/organisms/ad-slot";
import { ArticleNextBar } from "@/components/organisms/article-next-bar";
import { CommentsSlot } from "@/components/organisms/comments-slot";
import { ReadingProgress } from "@/components/organisms/reading-progress";
import { RelatedArticles } from "@/components/organisms/related-articles";
import { AuthorByline } from "@/components/molecules/author-byline";
import { Breadcrumb } from "@/components/molecules/breadcrumb";
import { NewsletterForm } from "@/components/molecules/newsletter-form";
import { ShareButtons } from "@/components/molecules/share-buttons";
import {
  getArticleBySlug,
  getNextArticleAfter,
  getRelatedArticles,
} from "@/lib/data/articles";
import { breadcrumbJsonLd, newsArticleJsonLd } from "@/lib/seo/jsonld";
import { MOCK_ARTICLES } from "@/lib/data/mock";
import { splitArticleBody } from "@/lib/utils/split-mdx";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Haber bulunamadı" };
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return {
    title: article.title,
    description: article.spot,
    openGraph: {
      title: article.title,
      description: article.spot,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      url: `${base}/haber/${article.slug}`,
      images: [{ url: article.hero_image_url, alt: article.hero_alt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article, 6);
  const next = getNextArticleAfter(article);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const shareUrl = `${siteUrl}/haber/${article.slug}`;

  const cat = article.categories[0];
  const city = article.cities[0];

  const newsLd = newsArticleJsonLd(article);
  const breadLd = breadcrumbJsonLd([
    { name: "Anasayfa", path: "/" },
    city
      ? { name: city.name, path: `/sehir/${city.slug}` }
      : { name: "Haberler", path: "/" },
    { name: article.title, path: `/haber/${article.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadLd) }}
      />
      <ReadingProgress />
      <article className="container-site py-8">
        <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-40">
              <ShareButtons url={shareUrl} title={article.title} />
            </div>
          </aside>
          <div className="lg:col-span-7">
            <Breadcrumb
              className="mb-4"
              items={[
                { label: "Anasayfa", href: "/" },
                ...(city
                  ? [{ label: city.name, href: `/sehir/${city.slug}` } as const]
                  : []),
                ...(cat
                  ? [{ label: cat.name, href: `/kategori/${cat.slug}` } as const]
                  : []),
                { label: article.title },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              {city ? (
                <a
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  href={`/sehir/${city.slug}`}
                >
                  {city.name}
                </a>
              ) : null}
              {cat ? (
                <a
                  className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent"
                  href={`/kategori/${cat.slug}`}
                >
                  {cat.name}
                </a>
              ) : null}
            </div>
            <h1 className="font-heading mt-4 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg font-medium leading-relaxed text-foreground-muted lg:text-xl">
              {article.spot}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
              <span className="font-medium text-foreground">{article.author.name}</span>
              <span aria-hidden>·</span>
              <span>{article.reading_time_min} dk okuma</span>
              <span aria-hidden>·</span>
              <time dateTime={article.published_at}>
                {new Date(article.published_at).toLocaleString("tr-TR")}
              </time>
            </div>

            <figure className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-xl ring-1 ring-border">
              <Image
                src={article.hero_image_url}
                alt={article.hero_alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
              />
              <figcaption className="mt-2 text-xs text-foreground-muted">
                {article.hero_alt}
              </figcaption>
            </figure>

            {(() => {
              const [first, rest] = splitArticleBody(article.body_mdx);
              return (
                <>
                  <div className="mt-10">
                    <ArticleBody source={first} />
                  </div>
                  <div className="mt-10 flex justify-center">
                    <AdSlot id={`article-inline-1-${article.slug}`} size="in-article" />
                  </div>
                  {rest ? (
                    <>
                      <div className="mt-10">
                        <ArticleBody source={rest} />
                      </div>
                      <div className="mt-10 flex justify-center">
                        <AdSlot id={`article-inline-2-${article.slug}`} size="in-article" />
                      </div>
                    </>
                  ) : null}
                </>
              );
            })()}

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <a
                  key={t.id}
                  href={`/etiket/${t.slug}`}
                  className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
                >
                  #{t.name}
                </a>
              ))}
            </div>

            <div className="mt-10">
              <AuthorByline author={article.author} updatedAt={article.updated_at} />
            </div>

            <div className="mt-8 lg:hidden">
              <ShareButtons url={shareUrl} title={article.title} />
            </div>

            <div className="mt-10 rounded-xl bg-muted/40 p-6 ring-1 ring-border">
              <p className="font-heading font-semibold text-foreground">Bülten</p>
              <NewsletterForm variant="inline" />
            </div>

            <RelatedArticles articles={related} />
            <CommentsSlot />
          </div>
          <aside className="mt-10 lg:col-span-4 lg:mt-0">
            <div className="sticky top-40 space-y-8">
              <AdSlot id={`article-sidebar-${article.slug}`} size="half-page" />
              <div>
                <p className="font-heading text-sm font-bold uppercase text-foreground-muted">
                  Popüler
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {related.slice(0, 5).map((a) => (
                    <li key={a.id}>
                      <a href={`/haber/${a.slug}`} className="hover:underline">
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>
      {next ? <ArticleNextBar title={next.title} href={`/haber/${next.slug}`} /> : null}
    </>
  );
}
