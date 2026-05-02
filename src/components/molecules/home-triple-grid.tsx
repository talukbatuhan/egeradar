import Image from "next/image";
import Link from "next/link";
import type { ArticleWithRelations } from "@/lib/types";
import { HOME_CONTENT_GUTTER, HOME_FOCUS_RING, HOME_SECTION_SPACING } from "@/lib/ui/home-page-layout";
import { cn } from "@/lib/utils/cn";

type Props = {
  articles: ArticleWithRelations[];
};

const TRIPLE_GRID_MAX = 18;

const cardShell =
  "group block overflow-hidden rounded-md border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";

const cardTitle =
  "font-heading text-left text-base font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 dark:text-slate-100 sm:text-lg md:text-xl motion-safe:md:group-hover:text-primary";

/** Manşet altı üçlü grid — LCP: ilk 3 görsel priority */
export function HomeTripleGrid({ articles }: Props) {
  const slice = articles.slice(0, TRIPLE_GRID_MAX);
  if (!slice.length) return null;

  return (
    <section
      className={cn("border-b border-border bg-muted/20", HOME_SECTION_SPACING)}
      aria-labelledby="triple-grid-heading"
    >
      <div className={HOME_CONTENT_GUTTER}>
        <h2
          id="triple-grid-heading"
          className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
        >
          Öne çıkanlar
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Editörün seçtiği güncel haberler.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {slice.map((article, index) => (
            <li key={article.id}>
              <Link
                href={`/haber/${article.slug}`}
                className={cn(cardShell, HOME_FOCUS_RING, "rounded-md")}
              >
                <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-t-md bg-muted">
                  <Image
                    src={article.hero_image_url}
                    alt={article.hero_alt?.trim() || article.title}
                    fill
                    priority={index < 3}
                    sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, min(100vw, 28rem)"
                    className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:md:group-hover:scale-[1.05] motion-safe:md:group-hover:brightness-[0.97]"
                  />
                </div>
                <div className="px-3 py-3 sm:px-4 sm:py-4">
                  <h3 className={cardTitle}>{article.title}</h3>
                  {article.spot ? (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {article.spot}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
