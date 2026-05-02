import Link from "next/link";
import { Fragment } from "react";

export type TickerItem = { id: string; title: string; href: string };

export function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;

  const sep = (
    <span className="mx-3 shrink-0 text-white/55 sm:mx-4" aria-hidden>
      •
    </span>
  );

  const linkClass =
    "inline-flex shrink-0 whitespace-nowrap text-sm font-medium text-white underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600";

  function segmentLinks(suffix: string) {
    return (
      <>
        {items.map((item, idx) => (
          <Fragment key={`${item.id}-${suffix}-${idx}`}>
            {idx > 0 ? sep : null}
            <Link href={item.href} className={linkClass}>
              {item.title}
            </Link>
          </Fragment>
        ))}
      </>
    );
  }

  function segmentPlain(suffix: string) {
    return (
      <>
        {items.map((item, idx) => (
          <Fragment key={`${item.id}-${suffix}-${idx}`}>
            {idx > 0 ? sep : null}
            <span className="inline-block shrink-0 whitespace-nowrap text-sm font-medium">
              {item.title}
            </span>
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <div
      className="flex w-full min-h-[2.75rem] select-none items-center overflow-hidden bg-red-600 text-white antialiased selection:bg-white/25"
      role="region"
      aria-label="Son dakika haberleri"
    >
      <div className="flex shrink-0 items-center self-stretch bg-red-700 px-3 py-2.5 text-xs font-bold uppercase tracking-wide sm:px-4 sm:text-sm">
        Son Dakika
      </div>

      <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
        <div className="overflow-hidden py-2.5">
          <div className="breaking-ticker__track">
            <div className="flex shrink-0 flex-nowrap items-center whitespace-nowrap pl-4 pr-8">
              {segmentLinks("a")}
            </div>
            <div
              className="flex shrink-0 flex-nowrap items-center whitespace-nowrap pr-12"
              aria-hidden
            >
              {segmentPlain("b")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
