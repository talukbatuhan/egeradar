-- EgeRadar — SQL Editor için tek seferlik test verisi
-- categories, cities, tags: slug çakışmasında isim güncellenir (UPSERT).
-- articles: slug'ı "ege-demo-" ile başlayan önceki demo haberler silinir, 10 yeni haber + article_tags eklenir.

BEGIN;

-- ---- Kategoriler (6) ----
INSERT INTO public.categories (slug, name) VALUES
  ('gundem', 'Gündem'),
  ('ekonomi', 'Ekonomi'),
  ('spor', 'Spor'),
  ('yasam', 'Yaşam'),
  ('turizm', 'Turizm'),
  ('teknoloji', 'Teknoloji'),
  ('saglik', 'Sağlık'),
  ('egitim', 'Eğitim')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- ---- Ege şehirleri (4) ----
INSERT INTO public.cities (slug, name) VALUES
  ('izmir', 'İzmir'),
  ('manisa', 'Manisa'),
  ('aydin', 'Aydın'),
  ('mugla', 'Muğla')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- ---- Etiketler ----
INSERT INTO public.tags (slug, name) VALUES
  ('ulasim', 'Ulaşım'),
  ('tarim', 'Tarım'),
  ('yerel-yonetim', 'Yerel yönetim'),
  ('kultur', 'Kültür'),
  ('cevre', 'Çevre'),
  ('turizm', 'Turizm'),
  ('egitim', 'Eğitim'),
  ('saglik', 'Sağlık')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- ---- Demo haberleri yeniden çalıştırmaya uygun temizlik ----
DELETE FROM public.article_tags
WHERE article_id IN (SELECT id FROM public.articles WHERE slug LIKE 'ege-demo-%');

DELETE FROM public.articles WHERE slug LIKE 'ege-demo-%';

-- ---- 10 test haberi ----
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
  'ege-demo-izmir-metro-hatti-yeni-duraklar',
  'İzmir''de metro hattına yeni duraklar için ihale süreci başladı',
  'Büyükşehir Belediyesi, Konak hattındaki yoğunluk nedeniyle planlanan ek duraklar için teknik şartname çalışmalarını tamamladığını duyurdu.',
  'İzmir Büyükşehir Belediyesi yetkilileri, şehir içi ulaşımda sürdürülebilirliği artırmak amacıyla metro ağına eklenecek duraklar için ihale takviminin önümüzdeki aylarda açıklanacağını belirtti. Proje kapsamında erişilebilirlik standartları ve aktarma noktaları gözden geçirilecek. Vatandaşlardan gelen yoğun talep doğrultusunda hat güzergâhında detaylı trafik ve yaya analizi yürütülüyor.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'gundem' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80&auto=format&fit=crop',
  now() - interval '2 days'
),
(
  'ege-demo-aydin-zeytin-ihracat-rekoru',
  'Aydın''da zeytinyağı ihracatında ilk çeyrekte rekor artış',
  'Ege İhracatçılar Birliği verilerine göre bölgeden gönderilen sofralık ve naturel sızma ürünlerinde talep özellikle Avrupa pazarında arttı.',
  'Üreticiler, hasat dönemindeki iklim koşullarının kaliteye olumlu yansıdığını ifade ediyor. Paketleme ve lojistik maliyetlerinin denetlenmesiyle birlikte birim fiyatların istikrarlı seyrettiği belirtiliyor. Tarım ve Orman Bakanlığı destek programlarına başvuru sayısında da geçen yıla göre yükseliş gözleniyor.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'ekonomi' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'aydin' LIMIT 1),
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80&auto=format&fit=crop',
  now() - interval '5 days'
),
(
  'ege-demo-manisa-futbol-altyapi-merkezi',
  'Manisa''da genç futbolcular için yeni altyapı merkezinin temeli atıldı',
  'Kulüpler Birliği ve yerel yönetim ortaklığıyla inşa edilecek tesis; antrenman sahaları, fizyoterapi ünitesi ve eğitim sınıflarını içerecek.',
  'Proje üç fazda tamamlanacak. İlk fazda iki doğal çim saha ve soyunma odaları hizmete girecek. Genç sporcuların okul dersleriyle uyumlu antrenman programları için akademik danışmanlık da sağlanacak. Bölge antrenörleri, keşif kampanyalarının önümüzdeki sezon daha geniş yaş gruplarını kapsayacağını duyurdu.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'spor' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'manisa' LIMIT 1),
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80&auto=format&fit=crop',
  now() - interval '1 day'
),
(
  'ege-demo-mugla-mavi-yolculuk-turist-artisi',
  'Muğla kıyılarında "mavi yolculuk" talebi yaz öncesi yüzde 18 arttı',
  'Turizm profesyonelleri, erken rezervasyon kampanyalarının ve çevre bilincine yönelik rotaların talebi desteklediğini söylüyor.',
  'Tekne işletmeleri, atık yönetimi ve koylarda kalabalık dengelemesi için dijital rezervasyon kotalarına geçişi hızlandırdı. Yerel esnaf, günübirlik turların yanı sıra kültür rotalarına olan ilginin arttığını kaydetti. Kıyı temizliği gönüllü etkinlikleri mayıs ayında yoğunlaşacak.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'turizm' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'mugla' LIMIT 1),
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80&auto=format&fit=crop',
  now() - interval '3 days'
),
(
  'ege-demo-izmir-girisimcilik-hizi-2026',
  'İzmir''de teknoloji girişimciliği için hızlandırıcı programına rekor başvuru',
  'Karma ofis alanları ve üniversite-sanayi iş birlikleriyle desteklenen programda seçilen ekipler mentorluk ve demo gününe çıkacak.',
  'Başvurular arasında sürdürülebilir enerji, denizcilik yazılımları ve sağlık teknolojileri öne çıktı. Seçici kurul, ürün-pazar uyumu ve ekip deneyimini ağırlıklı kriter olarak kullanacak. Kazanan projelere bulut kredisi ve hukuk danışmanlığı paketleri sunulacak.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'teknoloji' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
  now() - interval '12 hours'
),
(
  'ege-demo-izmir-kordon-kentsel-tasarim',
  'Kordon''da kentsel tasarım yarışmasının jüri değerlendirmesi tamamlandı',
  'Yaya önceliği ve yeşil alan bütünleşmesini hedefleyen projeler arasında halk oylaması aşamasına geçildi.',
  'Yarışmaya katılan ekipler, sıcak hava dalgalarında gölgelik alanların artırılması ve bisiklet koridorlarının güvenliğini ön plana çıkardı. Kazanan projenin uygulama bütçesi için belediye meclisinde görüşmeler sürecek. Stakeholder toplantılarında balıkçı barınakları ve deniz ulaşımı bağlantıları da ele alındı.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'yasam' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop',
  now() - interval '7 days'
),
(
  'ege-demo-manisa-saglik-ocagi-ası-gunu',
  'Manisa''da aile sağlığı merkezlerinde grip aşısı günü düzenlendi',
  'Risk grubundaki vatandaşlar için randevusuz ek kontenjan açıldı; sağlık personeli yoğun ilgiden memnun.',
  'İl Sağlık Müdürlüğü, aşının mevsimsel etkinliği için ideal dönemde olunması gerektiğini hatırlattı. Aynı gün içinde hipertansiyon taraması ve beslenme danışmanlığı da sunuldu. Yaşlı bakım evleri için mobil ekiplerin planlandığı bildirildi.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'saglik' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'manisa' LIMIT 1),
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop',
  now() - interval '4 days'
),
(
  'ege-demo-aydin-antik-kent-rehberi',
  'Aydın''da antik kent ziyaretçileri için yeni yönlendirme ve bilgilendirme panoları',
  'Kültür ve Turizm Bakanlığı desteğiyle güncellenen rota, güvenli yürüyüş güzergâhları ve kısa bilgi QR kodlarını içeriyor.',
  'Arkeolojik alanlarda ziyaretçi yoğunluğunu dengelemek için zaman dilimli giriş denemeleri yapılacak. Rehberler, yerel hikâyeleri anlatan kısa podcast bağlantılarının panolarda yer aldığını belirtti. Çevre duyarlılığı için plastiksiz bölge uygulaması teşvik ediliyor.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'turizm' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'aydin' LIMIT 1),
  'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80&auto=format&fit=crop',
  now() - interval '10 days'
),
(
  'ege-demo-mugla-plaj-temizligi-gonulluler',
  'Muğla''da gönüllülerle plaj temizliği kampanyası bin kilogram atık topladı',
  'Sivil toplum kuruluşları ve dalış kulüpleri ortak hareket etti; atıkların kaynağına yönelik farkındalık broşürleri dağıtıldı.',
  'Kampanya kapsamında mikroplastik örnekleri de laboratuvara gönderildi. Belediye yetkilileri, geri dönüşüm istasyonlarının sayısını artırma sözü verdi. Turistik koylarda "mavi bayrak" kriterlerine uyum için denetimlerin sıklaştırılacağı ifade edildi.',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'gundem' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'mugla' LIMIT 1),
  'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&q=80&auto=format&fit=crop',
  now() - interval '6 hours'
),
(
  'ege-demo-izmir-universite-kariyer-fuari',
  'İzmir''de üniversite kariyer fuarına rekor öğrenci katılımı',
  'Yerli ve yabancı yüzden fazla işveren stant açtı; staj ve mezuniyet sonrası pozisyonlar için birebir görüşmeler yapıldı.',
  'Kariyer merkezleri, özgeçmiş atölyeleri ve mock mülakat seanslarıyla fuara destek verdi. Öğrenciler, uzaktan çalışma ve hibrit model ilanlarına yoğun ilgi gösterdi. Girişimcilik köşesinde yer alan start-up''lar, prototip sergileriyle dikkat çekti.',
  'draft',
  (SELECT id FROM public.categories WHERE slug = 'egitim' LIMIT 1),
  (SELECT id FROM public.cities WHERE slug = 'izmir' LIMIT 1),
  'https://images.unsplash.com/photo-1523240795612-9a054b055dba?w=1200&q=80&auto=format&fit=crop',
  NULL
);

-- ---- Haber–etiket ilişkileri ----
INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'ulasim'
WHERE a.slug = 'ege-demo-izmir-metro-hatti-yeni-duraklar';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'yerel-yonetim'
WHERE a.slug = 'ege-demo-izmir-metro-hatti-yeni-duraklar';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'tarim'
WHERE a.slug = 'ege-demo-aydin-zeytin-ihracat-rekoru';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'egitim'
WHERE a.slug = 'ege-demo-manisa-futbol-altyapi-merkezi';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'turizm'
WHERE a.slug = 'ege-demo-mugla-mavi-yolculuk-turist-artisi';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'cevre'
WHERE a.slug = 'ege-demo-mugla-mavi-yolculuk-turist-artisi';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'kultur'
WHERE a.slug = 'ege-demo-aydin-antik-kent-rehberi';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'cevre'
WHERE a.slug = 'ege-demo-mugla-plaj-temizligi-gonulluler';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'saglik'
WHERE a.slug = 'ege-demo-manisa-saglik-ocagi-ası-gunu';

COMMIT;
