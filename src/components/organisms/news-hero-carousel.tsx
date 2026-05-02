"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export type NewsCarouselSlide = {
  id: string;
  title: string;
  spot: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

type Props = {
  slides: NewsCarouselSlide[];
  /** Varsayılan: true. prefers-reduced-motion ile kapanır. */
  autoplay?: boolean;
  autoplayIntervalMs?: number;
};

export function NewsHeroCarousel({
  slides,
  autoplay = true,
  autoplayIntervalMs = 6500,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => setReducedMotion(mq.matches));
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!autoplay || reducedMotion || paused || !emblaApi || slides.length < 2) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayIntervalMs, emblaApi, paused, reducedMotion, slides.length]);

  if (!slides.length) return null;

  return (
    <section
      className="border-b border-border bg-background py-4 md:py-6"
      aria-label="Öne çıkan haberler"
      aria-roledescription="carousel"
    >
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 md:w-[75%] md:max-w-[min(75vw,1200px)] md:px-0">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-2xl ring-1 ring-border/80 shadow-sm"
            style={{ height: "clamp(350px, 38vw, 450px)" }}
          >
            <div className="flex h-full touch-pan-y">
              {slides.map((slide, index) => (
                <div key={slide.id} className="min-w-0 shrink-0 grow-0 flex-[0_0_100%]">
                  <Link
                    href={slide.href}
                    className="group relative block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <Image
                      src={slide.imageUrl}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:brightness-[0.97]"
                      sizes="(max-width: 768px) 100vw, 75vw"
                      priority={index === 0}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
                      <h2 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm transition-colors duration-300 motion-safe:group-hover:text-accent sm:text-2xl md:text-3xl">
                        {slide.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
                        {slide.spot}
                      </p>
                      <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors duration-300 group-hover:text-white">
                        Haberi oku
                        <span className="ml-1" aria-hidden>
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex lg:left-3"
                aria-label="Önceki slayt"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex lg:right-3"
                aria-label="Sonraki slayt"
              >
                <ChevronIcon dir="right" />
              </button>
            </>
          ) : null}
        </div>

        {slides.length > 1 ? (
          <div className="mt-4 flex justify-center gap-2" aria-label="Slayt seçimi">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  i === selected
                    ? "w-8 bg-foreground"
                    : "w-2.5 bg-border hover:bg-foreground-muted"
                )}
                aria-label={`Slayt ${i + 1}`}
                aria-current={i === selected ? "true" : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mx-auto mt-3 flex w-full justify-center gap-3 px-4 md:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            className="flex h-10 max-w-[140px] flex-1 items-center justify-center rounded-xl border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Önceki slayt"
          >
            <ChevronIcon dir="left" className="mr-1" />
            Önceki
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="flex h-10 max-w-[140px] flex-1 items-center justify-center rounded-xl border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Sonraki slayt"
          >
            Sonraki
            <ChevronIcon dir="right" className="ml-1" />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function ChevronIcon({
  dir,
  className,
}: {
  dir: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden
    >
      {dir === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}
