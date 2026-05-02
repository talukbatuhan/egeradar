-- Kapak görselleri: public okuma, anon insert (CMS şu an auth kullanmıyor)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "article_images_select_public" ON storage.objects;
CREATE POLICY "article_images_select_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "article_images_insert_anon" ON storage.objects;
CREATE POLICY "article_images_insert_anon"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'article-images');

DROP POLICY IF EXISTS "article_images_insert_authenticated" ON storage.objects;
CREATE POLICY "article_images_insert_authenticated"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'article-images');
