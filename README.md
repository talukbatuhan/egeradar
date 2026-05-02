# Ege Radar

Ege bölgesi odaklı, Next.js (App Router) + Tailwind CSS v4 + Supabase ile geliştirilen haber sitesi iskeleti (V1).

## Kurulum

```bash
npm install
cp .env.example .env.local
```

`.env.local` içinde `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanımlı değilse uygulama **mock veri** ile çalışır (yerel demo).

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

- SQL şema: [`supabase/migrations/20250202120000_init.sql`](supabase/migrations/20250202120000_init.sql)
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
