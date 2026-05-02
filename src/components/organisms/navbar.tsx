"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { NAVBAR_BOTTOM_ITEMS, navbarTopCities } from "@/lib/data/constants";
import {
  navbarBottomHref,
  navbarBottomIsActive,
  parseNavbarCitySlug,
} from "@/lib/utils/navbar-routing";
import { cn } from "@/lib/utils/cn";

function Divider() {
  return (
    <span
      className="hidden h-5 w-px shrink-0 bg-white/25 md:block"
      aria-hidden
    />
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const cities = useMemo(() => navbarTopCities(), []);
  const activeCitySlug = useMemo(() => parseNavbarCitySlug(pathname), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      queueMicrotask(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900 text-slate-100 shadow-md md:border-b-0 md:shadow-none"
      lang="tr"
    >
      <div className="bg-slate-900">
        <div className="container-site flex h-14 items-center justify-between gap-3 sm:h-[3.25rem] md:gap-6">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-white transition-colors hover:text-accent sm:text-2xl"
          >
            Ege Radar
          </Link>

          <nav
            className="scrollbar-none mx-auto hidden max-w-full flex-1 items-center justify-center gap-0 overflow-x-auto px-2 md:flex md:gap-0"
            aria-label="Son dakika ve iller"
          >
            <div className="flex min-w-0 items-center gap-3 lg:gap-4">
              <Link
                href="/canli"
                aria-label="Son dakika"
                className={cn(
                  "flex shrink-0 items-center gap-2 text-xs font-bold tracking-wide text-white transition-colors hover:text-accent lg:text-sm",
                  pathname.startsWith("/canli") && "text-accent"
                )}
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span aria-hidden>SON DAKİKA</span>
              </Link>
              <Divider />
              {cities.map((city, index) => (
                <Fragment key={city.slug}>
                  <Link
                    href={`/sehir/${city.slug}`}
                    className={cn(
                      "shrink-0 text-xs font-bold uppercase tracking-wide text-slate-200 transition-colors hover:text-accent lg:text-sm",
                      pathname.startsWith(`/sehir/${city.slug}`) && "text-accent"
                    )}
                  >
                    {city.name.toLocaleUpperCase("tr-TR")}
                  </Link>
                  {index < cities.length - 1 ? <Divider /> : null}
                </Fragment>
              ))}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/arama"
              className="rounded-full p-2.5 text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
            </Link>

            <Link
              href="/giris"
              className="hidden items-center gap-2 rounded-full border border-white/45 bg-transparent px-3 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:border-accent hover:text-accent md:inline-flex lg:px-4 lg:text-sm"
            >
              <User className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              ÜYE GİRİŞİ
            </Link>

            <button
              type="button"
              className="rounded-full p-2.5 text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-haspopup="dialog"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <nav
        className="scrollbar-none hidden border-t border-slate-200/80 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:block"
        aria-label="Kategoriler"
      >
        <div className="container-site">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 lg:gap-x-8">
            {NAVBAR_BOTTOM_ITEMS.map((item) => {
              const href = navbarBottomHref(activeCitySlug, item);
              const active = navbarBottomIsActive(pathname, activeCitySlug, item);
              return (
                <li key={item.categorySlug}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-md px-1.5 py-1 text-sm font-semibold uppercase tracking-wide text-slate-700 transition-colors hover:text-primary dark:text-slate-200 dark:hover:text-accent",
                      active &&
                        "bg-primary/10 font-extrabold text-primary ring-2 ring-primary/35 dark:bg-accent/15 dark:text-accent dark:ring-accent/40"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-[60] flex md:hidden"
          role="presentation"
        >
          <button
            type="button"
            className="min-h-0 min-w-0 flex-1 cursor-default bg-black/50"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex h-full w-[min(100%,22rem)] shrink-0 flex-col bg-slate-900 text-slate-100 shadow-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span id={titleId} className="font-heading text-lg font-bold">
                Menü
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Son dakika
              </p>
              <Link
                href="/canli"
                aria-label="Son dakika"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg px-2 py-3 text-base font-semibold hover:bg-white/10"
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span aria-hidden>SON DAKİKA</span>
              </Link>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                İller
              </p>
              <ul className="mt-2 space-y-1">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/sehir/${city.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-2 py-2.5 text-base font-semibold uppercase tracking-wide hover:bg-white/10",
                        pathname.startsWith(`/sehir/${city.slug}`) && "text-accent"
                      )}
                    >
                      {city.name.toLocaleUpperCase("tr-TR")}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kategoriler
              </p>
              <ul className="mt-2 space-y-1">
                {NAVBAR_BOTTOM_ITEMS.map((item) => {
                  const href = navbarBottomHref(activeCitySlug, item);
                  const active = navbarBottomIsActive(pathname, activeCitySlug, item);
                  return (
                    <li key={`m-${item.categorySlug}`}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-lg px-2 py-2.5 text-base font-semibold uppercase tracking-wide hover:bg-white/10",
                          active && "bg-white/10 text-accent"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-400">Tema</span>
                <ThemeToggle className="text-slate-900 dark:text-slate-100" />
              </div>
              <Link
                href="/giris"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/45 py-3 text-sm font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                <User className="h-4 w-4" aria-hidden />
                ÜYE GİRİŞİ
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
