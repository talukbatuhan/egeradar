import Image from "next/image";
import Link from "next/link";
import type { ArticleWithRelations } from "@/lib/types";
import {
  HOME_CONTENT_GUTTER,
  HOME_FOCUS_RING,
  HOME_SECTION_SPACING,
} from "@/lib/ui/home-page-layout";
import { cn } from "@/lib/utils/cn";

export type CategoryNewsBlockProps = {
  categoryName: string;
  headerColor: string;
  articles: ArticleWithRelations[];
  sectionId?: string;
  className?: string;
  /** İlk blokta LCP için büyük görsel priority (isteğe bağlı) */
  imagePriority?: boolean;
};

function articleHref(slug: string) {
  return `/haber/${slug}`;
}

const cardBase =
  "group flex flex-col overflow-hidden rounded-md border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";

const titleLarge =
  "font-heading text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 dark:text-slate-100 motion-safe:group-hover:text-primary";

const titleSmall =
  "font-heading line-clamp-3 text-sm font-semibold leading-snug text-slate-900 transition-colors duration-300 dark:text-slate-100 sm:text-base motion-safe:group-hover:text-primary";

function LargeCard({
  article,
  priority,
}: {
  article: ArticleWithRelations;
  priority?: boolean;
}) {
  const href = articleHref(article.slug);
  const alt = article.hero_alt?.trim() || article.title;

  return (
    <Link href={href} className={cn(cardBase, HOME_FOCUS_RING, "rounded-md")}>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
        <Image
          src={article.hero_image_url}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28rem, 100vw"
          className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:brightness-[0.97]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className={titleLarge}>{article.title}</h3>
        {article.spot ? (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{article.spot}</p>
        ) : null}
      </div>
    </Link>
  );
}

function SmallCard({ article }: { article: ArticleWithRelations }) {
  const href = articleHref(article.slug);
  const alt = article.hero_alt?.trim() || article.title;

  return (
    <Link href={href} className={cn(cardBase, HOME_FOCUS_RING, "rounded-md")}>
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={article.hero_image_url}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 14rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:brightness-[0.97]"
        />
      </div>
      <div className="p-3">
        <h3 className={titleSmall}>{article.title}</h3>
      </div>
    </Link>
  );
}

export function CategoryNewsBlock({
  categoryName,
  headerColor,
  articles,
  sectionId,
  className,
  imagePriority,
}: CategoryNewsBlockProps) {
  const slice = articles.slice(0, 5);
  if (!slice.length) return null;

  const primary = slice[0]!;
  const secondary = slice.slice(1, 5);
  const headingId =
    sectionId ?? `category-block-${categoryName.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      className={cn("border-b border-border", HOME_SECTION_SPACING, className)}
      aria-labelledby={headingId}
    >
      <div className={HOME_CONTENT_GUTTER}>
        <h2
          id={headingId}
          className={cn(
            "w-full px-4 py-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-white sm:text-base",
            headerColor
          )}
        >
          {categoryName.toLocaleUpperCase("tr-TR")}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 lg:grid-cols-2 lg:gap-6">
          <div className="min-w-0 lg:min-h-0">
            <LargeCard article={primary} priority={imagePriority} />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
            {secondary.map((article) => (
              <SmallCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const CategoryBlock = CategoryNewsBlock;
