-- =============================================================================
-- EgeRadar — Haber ekosistemini Supabase SQL Editor’de temizleme
-- Tablolar: article_tags, articles, tags, cities, categories
-- =============================================================================
-- Sonrası test verisi: sql/seed_news_test_data_comprehensive.sql
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- SEÇENEK A (alternatif) — Yalnızca haber + haber–etiket; kategori/şehir/etiket kalır
-- Tam sıfırlama istemiyorsanız aşağıdaki B bloğunu yorumlayıp A’yı açın.
-- -----------------------------------------------------------------------------
-- TRUNCATE TABLE public.article_tags, public.articles RESTART IDENTITY CASCADE;

-- -----------------------------------------------------------------------------
-- SEÇENEK B (varsayılan) — Tam sıfırlama: tüm CMS / seed / manuel eklemeler
-- -----------------------------------------------------------------------------
TRUNCATE TABLE
  public.article_tags,
  public.articles,
  public.tags,
  public.cities,
  public.categories
RESTART IDENTITY CASCADE;

COMMIT;

-- =============================================================================
-- (İsteğe bağlı) Storage bucket article-images — genelde Dashboard veya
-- service_role ile temizlenir; anon politikasına göre hata verebilir.
-- =============================================================================
-- DELETE FROM storage.objects WHERE bucket_id = 'article-images';
