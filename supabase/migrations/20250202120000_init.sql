-- Ege Radar V1 — şema + RLS + örnek veri (mock ile uyumlu sluglar)
-- pg crypto UUID

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ---- YAZARLAR ----
CREATE TABLE public.authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  bio text,
  avatar_url text,
  role text,
  social_links jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---- KATEGORİ & ŞEHİR ----
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text,
  parent_id uuid REFERENCES public.categories (id) ON DELETE SET NULL
);

CREATE TABLE public.cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  plate_code text NOT NULL
);

-- ---- HABER ----
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  spot text NOT NULL,
  body_mdx text NOT NULL,
  hero_image_url text NOT NULL,
  hero_alt text NOT NULL,
  author_id uuid NOT NULL REFERENCES public.authors (id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  view_count int NOT NULL DEFAULT 0,
  reading_time_min int NOT NULL DEFAULT 3,
  is_featured boolean NOT NULL DEFAULT false,
  is_breaking boolean NOT NULL DEFAULT false,
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('turkish', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('turkish', coalesce(spot, '')), 'B')
  ) STORED
);

CREATE INDEX articles_search_idx ON public.articles USING gin (search_vector);
CREATE INDEX articles_published_idx ON public.articles (published_at DESC) WHERE status = 'published';

CREATE TABLE public.article_categories (
  article_id uuid NOT NULL REFERENCES public.articles (id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.categories (id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

CREATE TABLE public.article_cities (
  article_id uuid NOT NULL REFERENCES public.articles (id) ON DELETE CASCADE,
  city_id uuid NOT NULL REFERENCES public.cities (id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, city_id)
);

CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL
);

CREATE TABLE public.article_tags (
  article_id uuid NOT NULL REFERENCES public.articles (id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.tags (id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ---- BÜLTEN & OPERASYON ----
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  confirmed boolean NOT NULL DEFAULT false,
  confirm_token text UNIQUE,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz
);

CREATE TABLE public.breaking_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  link text NOT NULL,
  expires_at timestamptz,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ad_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  size text NOT NULL,
  page text NOT NULL,
  position text NOT NULL,
  provider text NOT NULL DEFAULT 'gam',
  code text,
  active boolean NOT NULL DEFAULT true,
  start_date date,
  end_date date
);

-- ---- RLS ----
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read authors" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Public read published articles" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read article_categories" ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "Public read article_cities" ON public.article_cities FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public read article_tags" ON public.article_tags FOR SELECT USING (true);
CREATE POLICY "Public read breaking" ON public.breaking_news FOR SELECT USING (true);
CREATE POLICY "Public read ad_slots active" ON public.ad_slots FOR SELECT USING (active = true);
CREATE POLICY "Insert newsletter own" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ---- SEED: şehir & kategori ----
INSERT INTO public.cities (slug, name, plate_code) VALUES
('izmir', 'İzmir', '35'),
('manisa', 'Manisa', '45'),
('mugla', 'Muğla', '48'),
('denizli', 'Denizli', '20'),
('aydin', 'Aydın', '09');

INSERT INTO public.categories (slug, name, description, icon) VALUES
('gundem', 'Gündem', 'Güncel gelişmeler', 'newspaper'),
('ekonomi', 'Ekonomi', 'İş ve ekonomi', 'chart'),
('kultur-sanat', 'Kültür-Sanat', 'Kültür ve sanat', 'palette'),
('spor', 'Spor', 'Spor haberleri', 'trophy'),
('yasam', 'Yaşam', 'Yaşam', 'heart'),
('cevre', 'Çevre', 'Çevre', 'leaf'),
('turizm', 'Turizm', 'Turizm', 'map'),
('asayis', 'Asayiş', 'Asayiş', 'shield'),
('egitim', 'Eğitim', 'Eğitim', 'book'),
('saglik', 'Sağlık', 'Sağlık', 'cross');

INSERT INTO public.authors (slug, name, bio, role) VALUES
('zelis-demir', 'Zeliş Demir', 'İzmir ve çevresinde haber.', 'Muhabir'),
('burak-kaya', 'Burak Kaya', 'Ekonomi editörü.', 'İktisat Editörü'),
('eda-yilmaz', 'Eda Yılmaz', 'Turizm ve kültür.', 'Muhabir');

INSERT INTO public.tags (slug, name) VALUES
('ulasim', 'Ulaşım'),
('tarim', 'Tarım'),
('festival', 'Festival'),
('deniz', 'Deniz'),
('iklim', 'İklim');

-- Not: Tam 20 haber seed uzun olduğu için uygulama mock verisi ile calisir;
-- Supabase'e icerik aktarmak icin Studio veya import script kullanin.
