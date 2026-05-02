"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export type AdSize =
  | "leaderboard"
  | "billboard"
  | "mpu"
  | "half-page"
  | "sticky-bottom"
  | "in-article"
  /** Anasayfa: mobil 320×100, masaüstü 728×90 — sabit yükseklik (CLS) */
  | "home-banner";

const SIZE_CLASSES: Record<AdSize, string> = {
  leaderboard: "aspect-[728/90] max-w-[728px] w-full min-h-[90px]",
  billboard: "aspect-[970/250] max-w-[970px] w-full min-h-[90px]",
  mpu: "aspect-[300/250] w-[300px] max-w-full",
  "half-page": "aspect-[300/600] w-[300px] max-w-full",
  "sticky-bottom": "aspect-[320/50] w-[320px] max-w-full",
  "in-article": "aspect-[300/250] w-full max-w-[300px]",
  "home-banner":
    "h-[100px] min-h-[100px] max-h-[100px] w-full max-w-[320px] md:h-[90px] md:min-h-[90px] md:max-h-[90px] md:max-w-[728px]",
};

type Props = {
  id: string;
  size: AdSize;
  label?: string;
  /** Reklam sağlayıcı script'i buraya inject edilir (GAM vb.) */
  provider?: "gam" | "placeholder";
  className?: string;
};

export function AdSlot({
  id,
  size,
  label = "Reklam",
  provider = "placeholder",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    if (size !== "sticky-bottom") return false;
    try {
      return !!sessionStorage.getItem(`ad-dismiss-${id}`);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (size === "sticky-bottom" && dismissed) return null;

  return (
    <aside
      ref={ref}
      className={cn(
        "relative mx-auto flex items-center justify-center overflow-hidden rounded-lg bg-muted/80 ring-1 ring-border",
        SIZE_CLASSES[size],
        size === "sticky-bottom" &&
          "fixed bottom-0 left-1/2 z-40 -translate-x-1/2 shadow-sm md:hidden",
        className
      )}
      aria-label={`${label} alanı`}
      data-ad-slot={id}
    >
      {size === "sticky-bottom" ? (
        <button
          type="button"
          className="absolute right-1 top-1 z-10 rounded bg-background/90 px-2 py-0.5 text-xs text-foreground shadow"
          onClick={() => {
            try {
              sessionStorage.setItem(`ad-dismiss-${id}`, "1");
            } catch {
              /* ignore */
            }
            setDismissed(true);
          }}
          aria-label="Reklamı kapat"
        >
          ✕
        </button>
      ) : null}
      <div className="flex flex-col items-center justify-center p-4 text-center text-xs text-foreground-muted">
        {visible || provider === "placeholder" ? (
          <>
            <span className="font-semibold uppercase tracking-wide">{label}</span>
            <span className="mt-1 text-[10px]">{id}</span>
            <span className="mt-2 hidden text-[10px] sm:inline">
              GAM / AdSense entegrasyonu için hazır kapsayıcı (CLS sabit)
            </span>
          </>
        ) : (
          <span className="animate-pulse">Yükleniyor…</span>
        )}
      </div>
    </aside>
  );
}
