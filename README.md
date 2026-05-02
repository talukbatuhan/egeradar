# Ege Radar

Ege bölgesi odaklı, Next.js (App Router) + Tailwind CSS v4 + Supabase ile geliştirilen haber sitesi iskeleti (V1).

## Kurulum

```bash
npm install
cp .env.example .env.local
```

Haber içeriği yalnızca Supabase üzerinden gelir; bu ortam değişkenleri tanımlı değilse haber listeleri ve detay sayfaları boş kalır (`supabase/seed.sql` veya SQL Editor seed dosyalarını kullanın).

## Geliştirme

```bash
npm run dev
```

## Üretim

```bash
npm run build
npm start
```

## Supabase

- Eski şema: [`supabase/migrations/20250202120000_init.sql`](supabase/migrations/20250202120000_init.sql) (ilk migration)
- **Güncel çekirdek şema (auth/yazar yok):** [`supabase/migrations/20260203120000_core_news_no_auth.sql`](supabase/migrations/20260203120000_core_news_no_auth.sql) — `supabase db reset` sırayla çalıştırır; bu dosya önceki tabloları kaldırıp yeni tabloları kurar.

### TypeScript tipleri (`Database`)

[Supabase CLI](https://supabase.com/docs/guides/cli) kurulu ve projeye bağlı iken:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/lib/supabase/database.types.ts
```

Yerel Docker veritabanına göre üretmek için:

```bash
npx supabase gen types typescript --local > src/lib/supabase/database.types.ts
```

`YOUR_PROJECT_REF`, Supabase Dashboard → **Project Settings → General → Reference ID**.
- Edge Function örneği (Deno): [`supabase/functions/subscribe/index.ts`](supabase/functions/subscribe/index.ts) — TypeScript derlemesi `tsconfig` ile hariç tutuldu.
- Bülten API: `POST /api/newsletter` — üretimde `SUPABASE_SERVICE_ROLE_KEY` gerekir; onay sayfası: `/confirm-newsletter?token=...`

## Özellikler (V1)

- Atomic design bileşen yapısı, tema (next-themes), erişilebilir navigasyon (skip link, odak halkaları)
- Haber detayında MDX gövde, okuma çubuğu, paylaşım, JSON-LD, ilgili haberler
- Reklam slot bileşeni (sabit en-boy, CLS için)
- `sitemap.xml`, `robots.txt`, `rss.xml`, Google News tarzı `haber-sitemap.xml`

## Komutlar

| Komut | Açıklama |
| ----- | -------- |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
