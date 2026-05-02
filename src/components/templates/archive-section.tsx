import Link from "next/link";
import { AdSlot } from "@/components/organisms/ad-slot";
import { NewsCard } from "@/components/molecules/news-card";
import type { ArticleWithRelations } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const PAGE_SIZE = 12;

function pageHref(
  basePath: string,
  page: number,
  extra?: Record<string, string | undefined>
) {
  const params = new URLSearchParams();
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v) params.set(k, v);
    }
  }
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export async function ArchiveSection({
  title,
  description,
  basePath,
  articles,
  page,
  sidebarPopular,
  extraSearchParams,
}: {
  title: string;
  description?: string;
  /** Örn: /kategori/gundem — sorgu yok */
  basePath: string;
  articles: ArticleWithRelations[];
  page: number;
  sidebarPopular?: ArticleWithRelations[];
  /** Sayfalama ve kalıcı filtre (örn. { kategori: 'gundem' }) */
  extraSearchParams?: Record<string, string | undefined>;
}) {
  const currentPage = Math.max(1, page);
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = articles.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="container-site py-10 lg:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-foreground-muted">{description}</p>
        ) : null}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {slice.map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
          {slice.length >= 6 ? (
            <div className="mt-8 flex justify-center">
              <AdSlot id="archive-infeed-native" size="mpu" />
            </div>
          ) : null}
          {!slice.length ? (
            <p className="py-16 text-center text-foreground-muted">
              Bu filtrelerle haber bulunamadı.
            </p>
          ) : null}

          <nav
            className="mt-10 flex items-center justify-center gap-4"
            aria-label="Sayfalama"
          >
            {hasPrev ? (
              <Link
                href={pageHref(basePath, currentPage - 1, extraSearchParams)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                rel="prev"
              >
                Önceki
              </Link>
            ) : (
              <span className="rounded-lg px-4 py-2 text-sm text-foreground-muted">
                Önceki
              </span>
            )}
            <span className="text-sm text-foreground-muted">
              Sayfa {currentPage} / {totalPages}
            </span>
            {hasNext ? (
              <Link
                href={pageHref(basePath, currentPage + 1, extraSearchParams)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                rel="next"
              >
                Sonraki
              </Link>
            ) : (
              <span className="rounded-lg px-4 py-2 text-sm text-foreground-muted">
                Sonraki
              </span>
            )}
          </nav>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
          <AdSlot id="archive-sidebar-halfpage" size="half-page" className="mx-auto" />
          {sidebarPopular?.length ? (
            <div className="mt-8 rounded-xl bg-surface p-4 ring-1 ring-border">
              <h2 className="font-heading text-sm font-bold uppercase text-foreground-muted">
                En çok okunanlar
              </h2>
              <ol className="mt-4 space-y-3">
                {sidebarPopular.slice(0, 5).map((a, i) => (
                  <li key={a.id}>
                    <Link
                      href={`/haber/${a.slug}`}
                      className={cn(
                        "flex gap-2 text-sm font-medium leading-snug hover:underline",
                        i < 3 && "text-accent font-semibold"
                      )}
                    >
                      <span className="font-heading text-lg font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <span>{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
