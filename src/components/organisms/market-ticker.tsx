"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { MarketQuote } from "@/lib/data/market-strip";
import { MOCK_MARKET_QUOTES } from "@/lib/data/market-strip";
import { cn } from "@/lib/utils/cn";

function QuoteChip({ q }: { q: MarketQuote }) {
  const up = q.changePct >= 0;
  return (
    <div
      className="flex shrink-0 items-center gap-2 border-r border-white/10 px-5 py-2 last:border-r-0"
      role="group"
      aria-label={`${q.label} ${q.value}, ${up ? "yükseliş" : "düşüş"} yüzde ${Math.abs(q.changePct)}`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {q.label}
      </span>
      <span className="font-mono text-sm font-semibold tabular-nums text-white">{q.value}</span>
      <span
        className={cn(
          "inline-flex items-center gap-0.5 font-mono text-xs font-semibold tabular-nums",
          up ? "text-emerald-400" : "text-rose-400"
        )}
      >
        {up ? (
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        )}
        {up ? "+" : ""}
        {q.changePct.toFixed(2)}%
      </span>
    </div>
  );
}

export function MarketTicker({ quotes = MOCK_MARKET_QUOTES }: { quotes?: MarketQuote[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => setReduceMotion(mq.matches));
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const loop = [...quotes, ...quotes];

  return (
    <div
      className="border-b border-slate-800 bg-slate-950 text-slate-100"
      role="region"
      aria-label="Piyasa özeti"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "flex w-max items-stretch",
            !reduceMotion && "animate-market-marquee"
          )}
          style={reduceMotion ? { flexWrap: "wrap", width: "100%", justifyContent: "center" } : undefined}
        >
          {reduceMotion
            ? quotes.map((q) => <QuoteChip key={q.id} q={q} />)
            : loop.map((q, i) => <QuoteChip key={`${q.id}-${i}`} q={q} />)}
        </div>
      </div>
    </div>
  );
}
