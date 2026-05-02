import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { searchArticlesLocal } from "@/lib/data/articles";
import { CATEGORIES, CITIES } from "@/lib/data/constants";

export const revalidate = 60;

type Props = { searchParams: Promise<{ q?: string; kategori?: string; sehir?: string }> };

function highlight(text: string, q: string) {
  if (!q.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeReg(q)})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="bg-accent/30 text-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const results = q
    ? await searchArticlesLocal(q, {
        categorySlug: sp.kategori,
        citySlug: sp.sehir,
      })
    : [];

  return (
    <div className="container-site py-10">
      <h1 className="font-heading text-3xl font-extrabold">Arama</h1>
      <form className="mt-6 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end" action="/arama" method="get">
        <div className="flex-1 md:min-w-[240px]">
          <label htmlFor="q" className="sr-only">
            Arama sorgusu
          </label>
          <Input
            id="q"
            name="q"
            type="search"
            placeholder="Kelime veya başlık..."
            defaultValue={q}
            className="text-lg"
          />
        </div>
        <div>
          <label htmlFor="kategori" className="mb-1 block text-xs font-medium text-foreground-muted">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={sp.kategori ?? ""}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            <option value="">Tümü</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sehir" className="mb-1 block text-xs font-medium text-foreground-muted">
            Şehir
          </label>
          <select
            id="sehir"
            name="sehir"
            defaultValue={sp.sehir ?? ""}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            <option value="">Tümü</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="primary">
          Ara
        </Button>
      </form>

      {q ? (
        <p className="mt-6 text-sm text-foreground-muted">
          “{q}” için {results.length} sonuç
        </p>
      ) : (
        <p className="mt-6 text-foreground-muted">
          Arama yapmak için bir kelime girin.
        </p>
      )}

      <ul className="mt-8 space-y-6">
        {results.map((a) => (
          <li key={a.id} className="flex gap-4 border-b border-border pb-6">
            <div className="hidden shrink-0 sm:block">
              <Image
                src={a.hero_image_url}
                alt=""
                width={96}
                height={96}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/haber/${a.slug}`} className="font-heading text-lg font-bold hover:underline">
                {highlight(a.title, q)}
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">
                {highlight(a.spot, q)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {q && !results.length ? (
        <div className="mt-10 rounded-xl bg-muted/50 p-8 text-center">
          <p className="font-medium">Sonuç bulunamadı.</p>
          <p className="mt-2 text-sm text-foreground-muted">
            Farklı kelimeler veya filtreler deneyin.
          </p>
        </div>
      ) : null}
    </div>
  );
}
