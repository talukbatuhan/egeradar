"use client";

import Link from "next/link";

export function ArticleNextBar({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 shadow-sm backdrop-blur md:hidden">
      <Link
        href={href}
        className="flex items-center justify-between gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="line-clamp-1">Sonraki: {title}</span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
