import Link from "next/link";
import { CITIES, NAVBAR_BOTTOM_ITEMS, categoryBySlug } from "@/lib/data/constants";
import { NewsletterForm } from "@/components/molecules/newsletter-form";

const FOOTER_LINKS = [
  { href: "/kunye", label: "Künye" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/reklam", label: "Reklam" },
  { href: "/kvkk", label: "KVKK" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/yayin-ilkeleri", label: "Yayın İlkeleri" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="bg-accent/15 py-10 dark:bg-accent/10" id="bulten">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
              Günün özetini e-postana al
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Hafta içi her sabah Ege gündeminin kısa özeti.
            </p>
            <div className="mt-6">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-extrabold text-primary">Ege Radar</p>
          <p className="mt-2 text-sm text-foreground-muted">
            Ege bölgesinin hızlı, tarafsız ve erişilebilir haber kaynağı.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href="https://x.com"
              className="text-foreground-muted hover:text-foreground"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://instagram.com"
              className="text-foreground-muted hover:text-foreground"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              className="text-foreground-muted hover:text-foreground"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <Link href="/rss.xml" className="text-foreground-muted hover:text-foreground">
              RSS
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Şehirler
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/sehir/${c.slug}`}
                  className="text-foreground-muted hover:text-foreground hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Kategoriler
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {NAVBAR_BOTTOM_ITEMS.map((item) => {
              const cat = categoryBySlug(item.categorySlug);
              const label = cat?.name ?? item.label;
              return (
                <li key={item.categorySlug}>
                  <Link
                    href={`/kategori/${item.categorySlug}`}
                    className="text-foreground-muted hover:text-foreground hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Kurumsal
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-foreground-muted hover:text-foreground hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-foreground-muted">
        <p>© {new Date().getFullYear()} Ege Radar · Tüm hakları saklıdır.</p>
        <p className="mt-1">
          <Link href="/sitemap.xml" className="hover:underline">
            Sitemap
          </Link>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          <span>Next.js + Supabase</span>
        </p>
      </div>
    </footer>
  );
}
