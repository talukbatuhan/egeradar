-- Ege Radar — çekirdek haber şeması (auth / kullanıcı / yazar YOK)
-- Önceki init şeması ile çakışmaması için eski public tabloları kaldırır; yeni tabloları kurar.
-- RLS: devre dışı + anon/authenticated/service_role için tam CRUD (giriş paneli yok)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---- Eski nesneler (varsa) ----
DROP TABLE IF EXISTS public.article_tags CASCADE;
DROP TABLE IF EXISTS public.article_categories CASCADE;
DROP TABLE IF EXISTS public.article_cities CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.authors CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.breaking_news CASCADE;
DROP TABLE IF EXISTS public.ad_slots CASCADE;
DROP TABLE IF EXISTS public.tags CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.cities CASCADE;

-- ---- Kategoriler ----
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE
);

-- ---- Şehirler ----
CREATE TABLE public.cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE
);

-- ---- Etiketler ----
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE
);

-- ---- Haberler (tek kategori + tek şehir) ----
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category_id uuid NOT NULL REFERENCES public.categories (id) ON DELETE RESTRICT,
  city_id uuid NOT NULL REFERENCES public.cities (id) ON DELETE RESTRICT,
  featured_image text NOT NULL DEFAULT '',
  published_at timestamptz
);

CREATE INDEX articles_slug_idx ON public.articles (slug);
CREATE INDEX articles_status_published_at_idx ON public.articles (status, published_at DESC);
CREATE INDEX articles_category_id_idx ON public.articles (category_id);
CREATE INDEX articles_city_id_idx ON public.articles (city_id);

-- ---- Haber–etiket ----
CREATE TABLE public.article_tags (
  article_id uuid NOT NULL REFERENCES public.articles (id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.tags (id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE INDEX article_tags_tag_id_idx ON public.article_tags (tag_id);

-- ---- RLS: kapalı (anon key ile doğrudan erişim) ----
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags DISABLE ROW LEVEL SECURITY;

-- ---- API rolleri (Supabase PostgREST) ----
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cities TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tags TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.article_tags TO anon, authenticated, service_role;

-- ---- Örnek seed (isteğe bağlı; Studio’da silebilirsiniz) ----
INSERT INTO public.cities (slug, name) VALUES
  ('izmir', 'İzmir'),
  ('manisa', 'Manisa'),
  ('mugla', 'Muğla'),
  ('denizli', 'Denizli'),
  ('aydin', 'Aydın');

INSERT INTO public.categories (slug, name) VALUES
  ('gundem', 'Gündem'),
  ('ekonomi', 'Ekonomi'),
  ('spor', 'Spor'),
  ('teknoloji', 'Teknoloji'),
  ('yasam', 'Yaşam'),
  ('turizm', 'Turizm'),
  ('egitim', 'Eğitim'),
  ('saglik', 'Sağlık'),
  ('asayis', 'Asayiş');

INSERT INTO public.tags (slug, name) VALUES
  ('ulasim', 'Ulaşım'),
  ('tarim', 'Tarım'),
  ('iklim', 'İklim');
