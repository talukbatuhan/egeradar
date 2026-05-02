-- EgeRadar — yerel/CLI test verisi (çekirdek şema: 20260203120000_core_news_no_auth.sql)
-- Yazar / kullanıcı kolonu yoktur.
-- SQL Editor için daha kapsamlı set: supabase/sql/seed_news_test_data_comprehensive.sql
-- Temizlik: supabase/sql/clear_news_data.sql

BEGIN;

-- ---- Mevcut veriyi ve (varsa) identity sıralarını sıfırla ----
TRUNCATE TABLE
  public.article_tags,
  public.articles,
  public.tags,
  public.cities,
  public.categories
RESTART IDENTITY CASCADE;

-- ---- 5 kategori ----
INSERT INTO public.categories (slug, name) VALUES
  ('gundem', 'Gündem'),
  ('ekonomi', 'Ekonomi'),
  ('spor', 'Spor'),
  ('teknoloji', 'Teknoloji'),
  ('kultur-sanat', 'Kültür Sanat');

-- ---- 5 Ege şehri ----
INSERT INTO public.cities (slug, name) VALUES
  ('izmir', 'İzmir'),
  ('manisa', 'Manisa'),
  ('aydin', 'Aydın'),
  ('denizli', 'Denizli'),
  ('mugla', 'Muğla');

-- ---- 5 etiket ----
INSERT INTO public.tags (slug, name) VALUES
  ('son-dakika', 'Son Dakika'),
  ('transfer', 'Transfer'),
  ('yerel-secim', 'Yerel Seçim'),
  ('ege-bolgesi', 'Ege Bölgesi'),
  ('yatirim', 'Yatırım');

-- ---- 10 haber (8 published, 2 draft) ----
INSERT INTO public.articles (
  slug,
  title,
  summary,
  content,
  status,
  category_id,
  city_id,
  featured_image,
  published_at
) VALUES
(
  'izmir-metro-saatleri-guncellendi',
  'İzmir''de metro sefer saatleri hafta içi için güncellendi',
  'Yoğun talep doğrultusunda sabah ve akşam dilimlerinde ek seferler planlandı; detaylar mobil uygulamada yayımlandı.',
  '<p>İzmir Büyükşehir Belediyesi, şehir içi ulaşımda yaşanan yoğunluk nedeniyle metro hatlarında sefer sıklığını artırdığını duyurdu.</p><p>Yolcuların aktarma noktalarında bekleme sürelerinin kısalması hedefleniyor. Güncel saat çizelgesi resmi web sitesi ve mobil uygulama üzerinden paylaşıldı.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'gundem' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=85&auto=format&fit=crop',
  now() - interval '1 day'
),
(
  'manisa-organize-sanayi-yeni-yatirim',
  'Manisa OSB''de yüksek teknoloji üretim tesisi için imzalar atıldı',
  'Bölgede istihdamın artırılması ve ihracat kapasitesinin güçlendirilmesi amacıyla yatırımın ilk fazı önümüzdeki yıl devreye girecek.',
  '<p>Manisa Organize Sanayi Bölgesi''nde kurulacak tesis, otomasyon ve enerji verimliliği odaklı üretim hatlarına sahip olacak.</p><p>Yerel paydaşlar, nitelikli iş gücü için mesleki eğitim programlarıyla iş birliği yapılacağını belirtti.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'ekonomi' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'manisa' LIMIT 1),
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85&auto=format&fit=crop',
  now() - interval '3 days'
),
(
  'aydin-zeytin-ihracat-rakamlari',
  'Aydın''dan zeytinyağı ihracatında ilk çeyrekte istikrarlı büyüme',
  'Pazar çeşitlendirmesi ve kalite sertifikasyonlarının etkisiyle birim fiyatlarda dengeli seyir gözleniyor.',
  '<p>Ege ihracatçıları, Avrupa ve Orta Doğu pazarlarına yönelik talebin sürdüğünü ifade etti.</p><p>Üreticiler hasat sonrası depolama koşullarının iyileştirilmesi için destek paketlerinden yararlanmaya devam ediyor.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'ekonomi' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'aydin' LIMIT 1),
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=85&auto=format&fit=crop',
  now() - interval '5 days'
),
(
  'denizli-travertenlerinde-ziyaretci-akisi',
  'Pamukkale travertenlerinde bahar döneminde ziyaretçi akışı yönetiliyor',
  'Güvenli yürüyüş güzergâhları ve zaman dilimli giriş uygulamalarıyla alan koruma ön planda tutuluyor.',
  '<p>Kültür ve turizm yetkilileri, UNESCO alanında sürdürülebilir ziyaretçi deneyimi için denetimleri sıkılaştırdığını açıkladı.</p><p>Rehberler, ziyaretçilere sıcak hava uyarıları ve su tüketimi konusunda bilgilendirme yapıyor.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'kultur-sanat' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'denizli' LIMIT 1),
  'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1600&q=85&auto=format&fit=crop',
  now() - interval '7 days'
),
(
  'mugla-mavikos-koy-temizligi',
  'Muğla kıyılarında gönüllülerle koy temizliği kampanyası tamamlandı',
  'Toplanan atıkların sınıflandırılması ve geri dönüşüme yönlendirilmesi için yerel işletmeler destek verdi.',
  '<p>Kampanya kapsamında dalış ekipleri deniz dibindeki atıkları da çıkardı.</p><p>Çevre örgütleri, tek kullanımlık plastiklerin azaltılması için farkındalık broşürleri dağıttı.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'gundem' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'mugla' LIMIT 1),
  'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1600&q=85&auto=format&fit=crop',
  now() - interval '2 days'
),
(
  'izmir-girisimcilik-zirvesi-basvurulari',
  'İzmir''de girişimcilik zirvesi için başvuru tarihleri açıklandı',
  'Seçilen projeler mentorluk, yatırımcı buluşmaları ve demo günü fırsatlarına erişebilecek.',
  '<p>Zirve kapsamında sürdürülebilirlik ve dijital dönüşüm temaları öne çıkıyor.</p><p>Başvurular çevrimiçi form üzerinden alınacak; jüri değerlendirmesi iki aşamalı olacak.</p>',
  'draft',
  (SELECT id FROM public.categories WHERE slug = 'teknoloji' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop',
  NULL
),
(
  'manisa-futbol-altyapi-projesi',
  'Manisa''da genç sporcular için yeni altyapı sahasının inşaatı sürüyor',
  'Proje tamamlandığında bölge kulüpleri ve okul takımları ortak kullanım modelinden yararlanacak.',
  '<p>Saha zemini ve aydınlatma sistemleri ulusal standartlara uygun şekilde planlandı.</p><p>Fizyoterapi ünitesi ve eğitim salonları da tesis bünyesinde yer alacak.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'spor' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'manisa' LIMIT 1),
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=85&auto=format&fit=crop',
  now() - interval '4 days'
),
(
  'aydin-antik-kent-bilgilendirme',
  'Aydın''daki antik kent alanlarında yeni bilgilendirme panoları hizmete girdi',
  'QR kodlar ile çok dilli içerik sunuluyor; ziyaretçi güvenliği için yönlendirme çizgileri yenilendi.',
  '<p>Arkeolojik buluntuların korunması için ziyaretçi yoğunluğu denetleniyor.</p><p>Yerel rehberler, tarihi bağlamı anlatan kısa sesli turların yakında devreye gireceğini duyurdu.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'kultur-sanat' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'aydin' LIMIT 1),
  'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=85&auto=format&fit=crop',
  now() - interval '10 days'
),
(
  'denizli-teknoloji-iskolu-programi',
  'Denizli''de yazılım ve gömülü sistemlere yönelik işkur programı kayıtları başladı',
  'Katılımcılara sertifika ve işyeri stajı eşleştirmesi sunulacak; kontenjan sınırlı.',
  '<p>Program, KOBİ''lerin dijitalleşme ihtiyaçlarına yönelik pratik modüller içeriyor.</p><p>Başvuru koşulları ve takvim ilgili kurumun duyuru sayfasında yayımlandı.</p>',
  'draft',
  (SELECT id FROM public.categories WHERE slug = 'teknoloji' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'denizli' LIMIT 1),
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85&auto=format&fit=crop',
  NULL
),
(
  'mugla-mavi-yolculuk-rezervasyonlari',
  'Muğla kıyılarında mavi yolculuk rezervasyonları erken dönemde hızlandı',
  'Çevre bilinci ve rotalarda sürdürülebilirlik kriterleri işletmeler tarafından öne çıkarılıyor.',
  '<p>Turizm temsilcileri, güvenli liman ve atık yönetimi denetimlerinin sıkılaştırıldığını belirtti.</p><p>Misafirlerden çevreye duyarlı davranış kurallarına uyum bekleniyor.</p>',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'kultur-sanat' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'mugla' LIMIT 1),
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85&auto=format&fit=crop',
  now() - interval '6 hours'
);

-- ---- Haber–etiket (çoka-çok) ----
INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'son-dakika'
WHERE a.slug IN ('izmir-metro-saatleri-guncellendi', 'mugla-mavikos-koy-temizligi');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'ege-bolgesi'
WHERE a.slug IN (
  'izmir-metro-saatleri-guncellendi',
  'manisa-organize-sanayi-yeni-yatirim',
  'aydin-zeytin-ihracat-rakamlari',
  'denizli-travertenlerinde-ziyaretci-akisi',
  'mugla-mavikos-koy-temizligi'
);

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'yatirim'
WHERE a.slug IN ('manisa-organize-sanayi-yeni-yatirim', 'aydin-zeytin-ihracat-rakamlari');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'transfer'
WHERE a.slug = 'manisa-futbol-altyapi-projesi';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'yerel-secim'
WHERE a.slug IN ('izmir-metro-saatleri-guncellendi', 'denizli-teknoloji-iskolu-programi');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'son-dakika'
WHERE a.slug = 'izmir-girisimcilik-zirvesi-basvurulari';

COMMIT;
