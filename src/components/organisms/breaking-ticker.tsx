import Link from "next/link";

export type TickerItem = { id: string; title: string; href: string };

export function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;

  return (
    <div
      className="border-b border-red-700 bg-breaking text-white"
      role="region"
      aria-label="Son dakika haberleri"
    >
      <div className="container-site flex items-center gap-2 py-2">
        <span className="shrink-0 rounded bg-white/15 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
          Son dakika
        </span>
        <div
          className="scrollbar-none flex min-h-[2rem] flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
          aria-live="polite"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="snap-start whitespace-nowrap text-sm font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-breaking"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
