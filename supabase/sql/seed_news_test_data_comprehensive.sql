-- =============================================================================
-- EgeRadar — Kapsamlı haber test verisi (SQL Editor)
-- ÖN KOŞUL: sql/clear_news_data.sql ile tam sıfırlama (veya boş tablolar).
-- Yazar / kullanıcı kolonu yoktur (çekirdek şema).
-- =============================================================================

BEGIN;

-- ---- Kategoriler (10) ----
INSERT INTO public.categories (slug, name) VALUES
  ('gundem', 'Gündem'),
  ('ekonomi', 'Ekonomi'),
  ('spor', 'Spor'),
  ('teknoloji', 'Teknoloji'),
  ('kultur-sanat', 'Kültür Sanat'),
  ('yasam', 'Yaşam'),
  ('turizm', 'Turizm'),
  ('saglik', 'Sağlık'),
  ('egitim', 'Eğitim'),
  ('asayis', 'Asayiş');

-- ---- Şehirler (5 — Ege) ----
INSERT INTO public.cities (slug, name) VALUES
  ('izmir', 'İzmir'),
  ('manisa', 'Manisa'),
  ('aydin', 'Aydın'),
  ('denizli', 'Denizli'),
  ('mugla', 'Muğla');

-- ---- Etiketler (12) ----
INSERT INTO public.tags (slug, name) VALUES
  ('son-dakika', 'Son Dakika'),
  ('ege-bolgesi', 'Ege Bölgesi'),
  ('ulasim', 'Ulaşım'),
  ('yatirim', 'Yatırım'),
  ('tarim', 'Tarım'),
  ('cevre', 'Çevre'),
  ('turizm', 'Turizm'),
  ('transfer', 'Transfer'),
  ('yerel-secim', 'Yerel Seçim'),
  ('egitim', 'Eğitim'),
  ('saglik', 'Sağlık'),
  ('kultur', 'Kültür');

-- ---- 20 haber (16 published, 4 draft) — slug öneki: seed-cms- ----
INSERT INTO public.articles (slug, title, summary, content, status, category_id, city_id, featured_image, published_at) VALUES
('seed-cms-01-izmir-metro-hatti', 'İzmir''de metro hattı kapasitesi için yeni vagon siparişi gündemde', 'Mevcut hatlarda yoğunluk artışına paralel olarak filonun genişletilmesi planlanıyor; ihale takvimi önümüzdeki ay netleşecek.',
'<p>Ulaşım master planı doğrultusunda yolcu kapasitesi ve sefer sıklığı hedefleri yeniden hesaplanıyor.</p><p>Erişilebilirlik standartlarına uygun vagon düzenleri ve klima sistemleri teknik şartnamede öncelikli maddeler arasında.</p><p>Vatandaş geri bildirimleri mobil uygulama ve sosyal medya üzerinden toplanmaya devam ediyor.</p>',
'published', (SELECT id FROM public.categories WHERE slug='gundem'), (SELECT id FROM public.cities WHERE slug='izmir'),
'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=85&auto=format&fit=crop', now() - interval '2 hours'),

('seed-cms-02-manisa-osb-robot', 'Manisa OSB''de robotik hat yatırımı için yer sağlama çalışmaları tamamlandı', 'Üretim verimliliğini artırmayı hedefleyen tesis, otomasyon entegrasyonu ile birlikte devreye alınacak.',
'<p>Yatırımcı firma, kalifiye personel için yerel meslek yüksekokullarıyla protokol imzaladı.</p><p>Enerji tüketimini düşürmek için güneş panelleri ve geri kazanım hatları projeye dahil edildi.</p>',
'published', (SELECT id FROM public.categories WHERE slug='ekonomi'), (SELECT id FROM public.cities WHERE slug='manisa'),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85&auto=format&fit=crop', now() - interval '1 day'),

('seed-cms-03-aydin-zeytin-borsa', 'Aydın''da zeytinyağı referans fiyatları haftalık tabloda açıklandı', 'Üretici birlikleri, kalite sınıflarına göre şeffaf fiyat aralığı yayınlayarak piyasaya güven vermeyi amaçlıyor.',
'<p>Soğuk sıkım ve organik ürünler ayrı sütunlarda listeleniyor.</p><p>İhracatçılar, lojistik maliyetlerindeki dalgalanmaya karşı sözleşme tavsiyelerini güncelledi.</p><p>Tarım sigortası ve hava durumu riskleri üretici toplantılarında ele alındı.</p>',
'published', (SELECT id FROM public.categories WHERE slug='ekonomi'), (SELECT id FROM public.cities WHERE slug='aydin'),
'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=85&auto=format&fit=crop', now() - interval '3 days'),

('seed-cms-04-denizli-unesco-ziyaret', 'Pamukkale travertenlerinde ziyaretçi deneyimi için yeni bilgilendirme alanları', 'Çok dilli tabelalar ve dijital rehber QR kodları ziyaretçi akışını yönlendirmeyi hedefliyor.',
'<p>UNESCO kriterleri çerçevesinde koruma bölgesi işaretlemeleri yenilendi.</p><p>Sıcak hava uyarıları ve su tüketimi konusunda anonslar artırıldı.</p>',
'published', (SELECT id FROM public.categories WHERE slug='turizm'), (SELECT id FROM public.cities WHERE slug='denizli'),
'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1600&q=85&auto=format&fit=crop', now() - interval '5 days'),

('seed-cms-05-mugla-mavi-koruma', 'Muğla kıyılarında "mavi bayrak" denetimleri için sezon hazırlığı', 'İşletmeler çevre eğitimi ve atık yönetimi belgelerini yenilemek üzere bilgilendirildi.',
'<p>Gönüllü dalış ekipleri koy temizliği takvimini paylaştı.</p><p>Yerel yönetim, tek kullanımlık plastiği azaltma kampanyasını genişletecek.</p><p>Turizm gelirlerinin sürdürülebilirlik fonuna aktarılması görüşülüyor.</p>',
'published', (SELECT id FROM public.categories WHERE slug='yasam'), (SELECT id FROM public.cities WHERE slug='mugla'),
'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1600&q=85&auto=format&fit=crop', now() - interval '12 hours'),

('seed-cms-06-izmir-girisim-hizi', 'İzmir''de teknoloji hızlandırıcısına rekor başvuru: seçici kurul takvimi açıklandı', 'Sürdürülebilirlik ve denizcilik yazılımları öne çıkan başvurular arasında yer alıyor.',
'<p>Mentorluk oturumları hibrit modelde yürütülecek.</p><p>Demo gününde yatırımcılar ve kamu satın alma temsilcileri bir araya getirilecek.</p>',
'draft', (SELECT id FROM public.categories WHERE slug='teknoloji'), (SELECT id FROM public.cities WHERE slug='izmir'),
'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop', NULL),

('seed-cms-07-manisa-futbol-altyapi', 'Manisa''da genç takımlar için yeni sentetik saha ve soyunma kompleksi', 'Kulüpler Birliği ile imzalanan protokol kapsamında ilk faz bu yıl tamamlanacak.',
'<p>Saha zemini ulusal federasyon standartlarına uygun test edildi.</p><p>Fizyoterapi ünitesi okul sporları için de ortak kullanıma açılacak.</p>',
'published', (SELECT id FROM public.categories WHERE slug='spor'), (SELECT id FROM public.cities WHERE slug='manisa'),
'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=85&auto=format&fit=crop', now() - interval '4 days'),

('seed-cms-08-aydin-antik-rota', 'Aydın''daki antik kent rotasında sesli rehber pilotu başladı', 'Ziyaretçiler QR kod ile Türkçe ve İngilizce anlatım dinleyebilecek.',
'<p>Arkeologlar, hassas alanlarda ses seviyesi sınırlaması uygulanacağını belirtti.</p><p>Yerel esnaf için sürdürülebilir tur paketleri tanıtıldı.</p>',
'published', (SELECT id FROM public.categories WHERE slug='kultur-sanat'), (SELECT id FROM public.cities WHERE slug='aydin'),
'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=85&auto=format&fit=crop', now() - interval '8 days'),

('seed-cms-09-denizli-yazilim-iskur', 'Denizli''de yazılım test otomasyonu işkurü programına kayıtlar sürüyor', 'Kontenjan sınırlı; başarılı katılımcılara sertifika ve işe yerleştirme desteği verilecek.',
'<p>Program modülleri web, API ve güvenlik testleri üzerine kurgulandı.</p><p>İşveren buluşmaları iki aşamalı planlandı.</p>',
'published', (SELECT id FROM public.categories WHERE slug='teknoloji'), (SELECT id FROM public.cities WHERE slug='denizli'),
'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85&auto=format&fit=crop', now() - interval '6 days'),

('seed-cms-10-mugla-mavi-tur', 'Bodrum açıklarında mavi yolculuk rotaları için sürdürülebilirlik rehberi', 'İşletmeler çapa ve atık yönetimi kurallarına uyum beyanı imzalayacak.',
'<p>Dijital rezervasyon kotaları pilot bölgede denenecek.</p><p>Misafirlere çevre duyarlı davranış broşürü dağıtılacak.</p>',
'published', (SELECT id FROM public.categories WHERE slug='turizm'), (SELECT id FROM public.cities WHERE slug='mugla'),
'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85&auto=format&fit=crop', now() - interval '18 hours'),

('seed-cms-11-izmir-asi-kampanya', 'İzmir''de grip aşısı kampanyası risk gruplarına öncelik veriyor', 'Aile sağlığı merkezlerinde ek kontenjan ve evde bakım birimleri için mobil planlama yapıldı.',
'<p>Sağlık Bakanlığı takvimine uygun doz stokları güncellendi.</p><p>Yoğun bakım kapasitesi izleme panelleri il düzeyinde paylaşılıyor.</p>',
'published', (SELECT id FROM public.categories WHERE slug='saglik'), (SELECT id FROM public.cities WHERE slug='izmir'),
'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=85&auto=format&fit=crop', now() - interval '9 days'),

('seed-cms-12-manisa-lise-laboratuvar', 'Manisa''da fen liseleri için laboratuvar yenileme bütçesi onaylandı', 'STEM atölyeleri ve robotik setler için ihale süreci başlatıldı.',
'<p>Öğretmenler için yaz kampları düzenlenecek.</p><p>Üniversite öğrencileri mentorluk sağlayacak.</p>',
'published', (SELECT id FROM public.categories WHERE slug='egitim'), (SELECT id FROM public.cities WHERE slug='manisa'),
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85&auto=format&fit=crop', now() - interval '7 days'),

('seed-cms-13-aydin-trafik-denetim', 'Aydın''da okul güzergâhlarında hız ve emniyet kemeri denetimi artırıldı', 'İl emniyet müdürlüğü, veli bilgilendirme mesajlarıyla kampanyayı destekliyor.',
'<p>Dron ile tespit pilotu sınırlı güzergâhlarda uygulanacak.</p><p>İhlallerde eğitim semineri seçeneği genişletildi.</p>',
'published', (SELECT id FROM public.categories WHERE slug='asayis'), (SELECT id FROM public.cities WHERE slug='aydin'),
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=85&auto=format&fit=crop', now() - interval '2 days'),

('seed-cms-14-denizli-kentsel-donusum', 'Denizli''de kentsel dönüşüm kapsamında yeni yeşil alan projeleri', 'Mahalle muhtarları ve mimarlar ortak çalıştayda buluştu.',
'<p>Yaya önceliği ve bisiklet koridorları ön planda.</p><p>Yaşlı ve engelli erişimi için rampa standartları revize edildi.</p>',
'published', (SELECT id FROM public.categories WHERE slug='yasam'), (SELECT id FROM public.cities WHERE slug='denizli'),
'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85&auto=format&fit=crop', now() - interval '11 days'),

('seed-cms-15-mugla-balikci-barinagi', 'Muğla''da balıkçı barınağı altyapısı için liman bakım programı', 'Su şebekesi ve atıksu hattı yenilemesi koordineli yürütülecek.',
'<p>Av sezonu dışında çalışma pencereleri belirlendi.</p><p>Kooperatiflere düşük faizli ekipman desteği duyuruldu.</p>',
'published', (SELECT id FROM public.categories WHERE slug='ekonomi'), (SELECT id FROM public.cities WHERE slug='mugla'),
'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop', now() - interval '30 hours'),

('seed-cms-16-izmir-konser-akustik', 'İzmir''de açık hava etkinlik alanında akustik iyileştirme tamamlandı', 'Sanatçılar deneme provasında olumlu geri bildirim verdi.',
'<p>Yaz programı önümüzdeki hafta açıklanacak.</p><p>Gürültü ölçümleri çevre müdürlüğüne raporlandı.</p>',
'published', (SELECT id FROM public.categories WHERE slug='kultur-sanat'), (SELECT id FROM public.cities WHERE slug='izmir'),
'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=85&auto=format&fit=crop', now() - interval '14 days'),

('seed-cms-17-manisa-tiyatro-sezon', 'Manisa''da devlet tiyatrosu yeni sezon biletleri satışa çıktı', 'Çocuk oyunları ve klasik eserler aynı çatı altında.',
'<p>İndirimli öğrenci paketleri sınırlı kontenjanla sunuluyor.</p>',
'draft', (SELECT id FROM public.categories WHERE slug='kultur-sanat'), (SELECT id FROM public.cities WHERE slug='manisa'),
'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&q=85&auto=format&fit=crop', NULL),

('seed-cms-18-aydin-futbol-altyapi', 'Aydın''da amatör lig kulüplarına ekipman desteği başvuruları', 'Kulüp başkanları için bilgilendirme toplantısı düzenlendi.',
'<p>Yaş gruplarına göre top ve forma setleri dağıtım kriterleri açıklandı.</p><p>Hakem ve antrenör seminerleri mart ayında yapılacak.</p>',
'published', (SELECT id FROM public.categories WHERE slug='spor'), (SELECT id FROM public.cities WHERE slug='aydin'),
'https://images.unsplash.com/photo-1461896836934-7b4a9ec6383e?w=1600&q=85&auto=format&fit=crop', now() - interval '5 hours'),

('seed-cms-19-denizli-tarim-fuari', 'Denizli''de tarım teknolojileri fuarı için stant planları netleşti', 'Drone ve damlama sistemleri ana tema; kimyasal kullanımını azaltan çözümler öne çıkıyor.',
'<p>Fuar alanında üreticiler için danışma köşeleri ayrıldı.</p><p>Girişimciler, IoT sensör demoları ile stant başına randevu sistemine geçecek.</p>',
'draft', (SELECT id FROM public.categories WHERE slug='ekonomi'), (SELECT id FROM public.cities WHERE slug='denizli'),
'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=85&auto=format&fit=crop', NULL),

('seed-cms-20-mugla-iklim-paneli', 'Muğla''da iklim değişikliği paneli: kıyı erozyonu ve turizm senaryoları', 'Üniversite ve belediye temsilcileri ortak bildiri hazırlamak için çalışma grubu kurdu.',
'<p>Panel sonunda gönüllü gözlem ağına kayıt çağrısı yapıldı.</p><p>Yerel basın canlı yayın ile katılımı genişletti.</p>',
'draft', (SELECT id FROM public.categories WHERE slug='gundem'), (SELECT id FROM public.cities WHERE slug='mugla'),
'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&q=85&auto=format&fit=crop', NULL);

-- ---- Haber–etiket (çoka-çok) ----
INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'son-dakika'
WHERE a.slug IN ('seed-cms-01-izmir-metro-hatti','seed-cms-05-mugla-mavi-koruma','seed-cms-11-izmir-asi-kampanya','seed-cms-13-aydin-trafik-denetim');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'ege-bolgesi'
WHERE a.slug LIKE 'seed-cms-%';

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'ulasim'
WHERE a.slug IN ('seed-cms-01-izmir-metro-hatti','seed-cms-13-aydin-trafik-denetim');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'yatirim'
WHERE a.slug IN ('seed-cms-02-manisa-osb-robot','seed-cms-15-mugla-balikci-barinagi');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'tarim'
WHERE a.slug IN ('seed-cms-03-aydin-zeytin-borsa','seed-cms-19-denizli-tarim-fuari');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'cevre'
WHERE a.slug IN ('seed-cms-05-mugla-mavi-koruma','seed-cms-10-mugla-mavi-tur','seed-cms-20-mugla-iklim-paneli');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'turizm'
WHERE a.slug IN ('seed-cms-04-denizli-unesco-ziyaret','seed-cms-10-mugla-mavi-tur');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'transfer'
WHERE a.slug IN ('seed-cms-07-manisa-futbol-altyapi','seed-cms-18-aydin-futbol-altyapi');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'yerel-secim'
WHERE a.slug IN ('seed-cms-14-denizli-kentsel-donusum','seed-cms-20-mugla-iklim-paneli');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'egitim'
WHERE a.slug IN ('seed-cms-12-manisa-lise-laboratuvar','seed-cms-09-denizli-yazilim-iskur');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'saglik'
WHERE a.slug IN ('seed-cms-11-izmir-asi-kampanya');

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id FROM public.articles a JOIN public.tags t ON t.slug = 'kultur'
WHERE a.slug IN ('seed-cms-08-aydin-antik-rota','seed-cms-16-izmir-konser-akustik','seed-cms-17-manisa-tiyatro-sezon');

COMMIT;