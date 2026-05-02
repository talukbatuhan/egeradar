import Image from "next/image";
import Link from "next/link";
import type { ArticleWithRelations } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { formatRelativeShort } from "@/lib/utils/format-date";
import { Badge } from "@/components/atoms/badge";

export type NewsCardVariant =
  | "hero"
  | "featured"
  | "thumbnail"
  | "text-only"
  | "compact"
  | "list";

export type NewsCardProps = {
  article: ArticleWithRelations;
  variant?: NewsCardVariant;
  /** Liste sırası (variant=list) */
  index?: number;
  priority?: boolean;
  className?: string;
};

export function NewsCard({
  article,
  variant = "featured",
  index,
  priority = false,
  className,
}: NewsCardProps) {
  const cat = article.categories[0];
  const href = `/haber/${article.slug}`;

  if (variant === "hero") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block overflow-hidden rounded-2xl ring-1 ring-border",
          className
        )}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.hero_image_url}
            alt={article.hero_alt}
            fill
            className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:md:group-hover:scale-[1.05] motion-safe:md:group-hover:brightness-[0.97]"
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          {cat ? (
            <span className="mb-2 inline-block">
              <Badge tone="accent">{cat.name}</Badge>
            </span>
          ) : null}
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white transition-colors duration-300 motion-safe:md:group-hover:text-accent sm:text-3xl md:text-4xl lg:text-5xl">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-white/90 sm:text-base">
            {article.spot}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "text-only") {
    return (
      <Link
        href={href}
        className={cn(
          "group block rounded-lg border-l-4 border-accent bg-surface p-4 ring-1 ring-border motion-safe:transition-colors motion-safe:md:hover:ring-border",
          className
        )}
      >
        {cat ? (
          <span className="text-xs font-semibold text-accent">{cat.name}</span>
        ) : null}
        <h3 className="font-heading mt-1 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 motion-safe:group-hover:text-primary sm:text-xl">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">
          {article.spot}
        </p>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex gap-3 rounded-lg p-2 ring-1 ring-transparent motion-safe:md:hover:ring-border",
          className
        )}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.hero_image_url}
            alt={article.hero_alt}
            width={80}
            height={80}
            className="h-full w-full object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:md:group-hover:scale-[1.05] motion-safe:md:group-hover:brightness-[0.97]"
            sizes="80px"
          />
        </div>
        <div className="min-w-0 flex-1">
          {cat ? (
            <span className="text-xs font-medium text-accent">{cat.name}</span>
          ) : null}
          <h3 className="font-heading line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors duration-300 motion-safe:group-hover:text-primary">
            {article.title}
          </h3>
          <time
            className="mt-1 text-xs text-foreground-muted"
            dateTime={article.published_at}
          >
            {formatRelativeShort(article.published_at)}
          </time>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex gap-3 border-b border-border py-3 last:border-0",
          className
        )}
      >
        {typeof index === "number" ? (
          <span className="font-heading text-2xl font-extrabold text-accent tabular-nums">
            {index + 1}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground transition-colors duration-300 motion-safe:group-hover:text-primary">
            {article.title}
          </h3>
          <time
            className="mt-1 block text-xs text-foreground-muted"
            dateTime={article.published_at}
          >
            {formatTurkishDateTime(article.published_at)}
          </time>
        </div>
      </Link>
    );
  }

  if (variant === "thumbnail") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex flex-col gap-3 rounded-xl ring-1 ring-border motion-safe:md:hover:ring-border md:flex-row",
          className
        )}
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg md:aspect-auto md:h-40 md:w-[40%]">
          <Image
            src={article.hero_image_url}
            alt={article.hero_alt}
            fill
            className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:md:group-hover:scale-[1.05] motion-safe:md:group-hover:brightness-[0.97]"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center py-1 md:py-0">
          {cat ? (
            <Badge tone="default" className="w-fit">
              {cat.name}
            </Badge>
          ) : null}
          <h3 className="font-heading mt-2 text-xl font-bold tracking-tight text-foreground transition-colors duration-300 motion-safe:group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">
            {article.spot}
          </p>
          <time
            className="mt-auto pt-2 text-xs text-foreground-muted"
            dateTime={article.published_at}
          >
            {formatRelativeShort(article.published_at)}
          </time>
        </div>
      </Link>
    );
  }

  /* featured — default */
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl bg-surface ring-1 ring-border motion-safe:md:hover:ring-border",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={article.hero_image_url}
          alt={article.hero_alt}
          fill
          className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:md:group-hover:scale-[1.05] motion-safe:md:group-hover:brightness-[0.97]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
        {article.is_breaking ? (
          <span className="absolute left-2 top-2">
            <Badge tone="breaking">Son dakika</Badge>
          </span>
        ) : null}
      </div>
      <div className="p-4">
        {cat ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {cat.name}
          </span>
        ) : null}
        <h3 className="font-heading mt-1 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 motion-safe:group-hover:text-primary sm:text-xl">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">
          {article.spot}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
          <span>{article.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.published_at}>
            {formatRelativeShort(article.published_at)}
          </time>
        </div>
      </div>
    </Link>
  );
}

function formatTurkishDateTime(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
