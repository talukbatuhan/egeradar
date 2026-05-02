import type { ArticleWithRelations, Author, BreakingNews, Tag } from "@/lib/types";
import { CATEGORIES, CITIES } from "./constants";

/** Dönen görseller — bilinen Unsplash photo-* kimlikleri (404 riskini azaltır) */
const UNSPLASH = [
  "1506905925346-21bda4d32df4",
  "1528127267362-6e13e8f7e7d6",
  "1540555704318-192d7e8e6b3d",
  "1500382017468-9049fed7be7c",
  "1472214103451-9374bd1c798e",
  "1507525428034-b723cf961d3e",
  "1540959733332-eab4deabeeaf",
  "1576091160399-112ba8d25d1d",
];

function unsplashAt(i: number, w = 1200, h = 675) {
  const id = UNSPLASH[i % UNSPLASH.length];
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&auto=format&fit=crop&q=80`;
}

export const MOCK_AUTHORS: Author[] = [
  {
    id: "a1",
    slug: "zelis-demir",
    name: "Zeliş Demir",
    bio: "İzmir ve çevresinde kentsel dönüşüm, ulaşım ve yerel politika üzerine yazıyor.",
    avatar_url: null,
    role: "Muhabir",
    social_links: { x: "https://x.com", instagram: "https://instagram.com" },
  },
  {
    id: "a2",
    slug: "burak-kaya",
    name: "Burak Kaya",
    bio: "Ekonomi ve tarım politikalarını takip ediyor.",
    avatar_url: null,
    role: "İktisat Editörü",
    social_links: null,
  },
  {
    id: "a3",
    slug: "eda-yilmaz",
    name: "Eda Yılmaz",
    bio: "Turizm, kültür ve saha etkinlikleri.",
    avatar_url: null,
    role: "Muhabir",
    social_links: null,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: "t1", slug: "ulasim", name: "Ulaşım" },
  { id: "t2", slug: "tarim", name: "Tarım" },
  { id: "t3", slug: "festival", name: "Festival" },
  { id: "t4", slug: "deniz", name: "Deniz" },
  { id: "t5", slug: "iklim", name: "İklim" },
];

const baseBody = (title: string) => `
${title} kapsamında yapılan çalışmalar, Ege illerinde günlük yaşamı doğrudan etkiliyor.

## Detaylar

Yerel yönetim ve ilgili kurumlar, projenin **2026** sonuna kadar tamamlanacağını duyurdu. İlk etapta üç ilçe pilot bölge olarak seçildi.

> Bu adım, bölgenin sürdürülebilirlik hedefleriyle uyumlu şekilde planlandı.

Uzmanlar, şeffaf iletişim ve düzenli bilgilendirme ile sürecin yürütülmesi gerektiğini vurguluyor.

### Sonraki adımlar

- Kamuoyuna açık bilgilendirme toplantıları
- Dijital başvuru kanallarının genişletilmesi
- Saha denetimlerinin artırılması

\`\`\`
Özet: Ege illeri için ortak koordinasyon ve veri paylaşımı ön planda.
\`\`\`

Haber kapsamında gelişmeler oldukça güncellenecektir.
`;

type Seed = {
  slug: string;
  title: string;
  spot: string;
  categorySlug: string;
  citySlug: string;
  tagSlugs: string[];
  authorId: string;
  heroAlt: string;
  featured: boolean;
  breaking: boolean;
  minutesAgo: number;
  views: number;
};

const seeds: Seed[] = [
  {
    slug: "izmir-metro-hatti-genisleme-calismalari-hizlandi",
    title: "İzmir'de metro hattı genişleme çalışmaları hızlandı",
    spot: "Yeni duraklar ve depo alanı için ihale süreçleri başladı; hedef 2026.",
    categorySlug: "gundem",
    citySlug: "izmir",
    tagSlugs: ["ulasim"],
    authorId: "a1",
    heroAlt: "İzmir körfez üzerinde şehir manzarası",
    featured: true,
    breaking: true,
    minutesAgo: 30,
    views: 12840,
  },
  {
    slug: "aydin-zeytin-hasadi-rekolte-beklentisi-yukseldi",
    title: "Aydın'da zeytin hasadında rekolte beklentisi yükseldi",
    spot: "Kooperatifler erken hasadın kaliteyi artırdığını belirtiyor.",
    categorySlug: "ekonomi",
    citySlug: "aydin",
    tagSlugs: ["tarim"],
    authorId: "a2",
    heroAlt: "Zeytin ağaçları ve tarla",
    featured: true,
    breaking: false,
    minutesAgo: 120,
    views: 4320,
  },
  {
    slug: "bodrum-marina-cevre-duzenlemesi-tamamlandi",
    title: "Bodrum'da marina çevre düzenlemesi tamamlandı",
    spot: "Yaya yolları ve peyzaj yenilemesiyle sahil bandı düzenlendi.",
    categorySlug: "turizm",
    citySlug: "mugla",
    tagSlugs: ["deniz"],
    authorId: "a3",
    heroAlt: "Sahil ve liman",
    featured: true,
    breaking: false,
    minutesAgo: 240,
    views: 9100,
  },
  {
    slug: "manisa-organize-sanayi-yeni-yatirim-duyurusu",
    title: "Manisa OSB'de yeni yatırım paketi duyuruldu",
    spot: "İstihdam ve lojistik kapasitesi için destekler genişletildi.",
    categorySlug: "ekonomi",
    citySlug: "manisa",
    tagSlugs: [],
    authorId: "a2",
    heroAlt: "Fabrika içi üretim hattı",
    featured: false,
    breaking: false,
    minutesAgo: 360,
    views: 2980,
  },
  {
    slug: "denizli-pamukkale-giris-duzenlemesi",
    title: "Pamukkale giriş düzenlemesi ziyaretçi akışını rahatlattı",
    spot: "Ön rezervasyon ve shuttle hatları kalabalığı azalttı.",
    categorySlug: "turizm",
    citySlug: "denizli",
    tagSlugs: [],
    authorId: "a3",
    heroAlt: "Travertenler ve havuz",
    featured: false,
    breaking: false,
    minutesAgo: 480,
    views: 7650,
  },
  {
    slug: "denizli-teknokent-girisim-programi-basladi",
    title: "Denizli Teknokent girişim programı başladı",
    spot: "Erken aşama projeler için mentorluk ve test laboratuvarı açıldı.",
    categorySlug: "egitim",
    citySlug: "denizli",
    tagSlugs: [],
    authorId: "a2",
    heroAlt: "Modern ofis ve bilgisayar",
    featured: false,
    breaking: false,
    minutesAgo: 600,
    views: 1540,
  },
  {
    slug: "aydin-termal-bolge-turizm-destekleri",
    title: "Aydın termal bölgelerinde turizm destekleri açıklandı",
    spot: "Konaklama doluluk oranında önceki yıla göre artış bekleniyor.",
    categorySlug: "turizm",
    citySlug: "aydin",
    tagSlugs: [],
    authorId: "a3",
    heroAlt: "Termal havuz ve otel",
    featured: false,
    breaking: false,
    minutesAgo: 720,
    views: 3890,
  },
  {
    slug: "izmir-seramik-ve-tasarim-haftasi-basladi",
    title: "İzmir’de seramik ve tasarım haftası başladı",
    spot: "Yerel üreticiler ihracat bağlantıları için B2B görüşmeler yaptı.",
    categorySlug: "kultur-sanat",
    citySlug: "izmir",
    tagSlugs: ["festival"],
    authorId: "a3",
    heroAlt: "Seramik ürünler sergi alanı",
    featured: false,
    breaking: false,
    minutesAgo: 840,
    views: 2210,
  },
  {
    slug: "aydin-soke-zeytin-ureticileri-bulusmasi",
    title: "Söke’de zeytin üreticileri buluşması sonuçlandı",
    spot: "Kooperatif ürünleri ödül aldı; kalite kriterleri sıkılaştırıldı.",
    categorySlug: "yasam",
    citySlug: "aydin",
    tagSlugs: ["tarim"],
    authorId: "a2",
    heroAlt: "Zeytinyağı şişeleri",
    featured: false,
    breaking: false,
    minutesAgo: 960,
    views: 1780,
  },
  {
    slug: "izmir-konak-tramvay-sefer-sikligi-artti",
    title: "Konak tramvayında sefer sıklığı artırıldı",
    spot: "Yoğun saatlerde headway kısaltıldı; aktarma uyarıları güncellendi.",
    categorySlug: "gundem",
    citySlug: "izmir",
    tagSlugs: ["ulasim"],
    authorId: "a1",
    heroAlt: "Tramvay rayları ve şehir",
    featured: false,
    breaking: true,
    minutesAgo: 45,
    views: 6720,
  },
  {
    slug: "mugla-datca-deniz-temizligi-etkinligi",
    title: "Datça'da kıyı temizliği etkinliği düzenlendi",
    spot: "Gönüllüler ve belediye ekipleri birlikte sahil hattını temizledi.",
    categorySlug: "cevre",
    citySlug: "mugla",
    tagSlugs: ["deniz", "iklim"],
    authorId: "a3",
    heroAlt: "Deniz kıyısı ve kayalar",
    featured: false,
    breaking: false,
    minutesAgo: 1080,
    views: 2450,
  },
  {
    slug: "manisa-futbol-altyapi-projesi-genclere-acildi",
    title: "Manisa'da futbol altyapı projesi gençlere açıldı",
    spot: "Yeni test merkezi ve saha bakım programı duyuruldu.",
    categorySlug: "spor",
    citySlug: "manisa",
    tagSlugs: [],
    authorId: "a1",
    heroAlt: "Futbol sahası ve kale",
    featured: false,
    breaking: false,
    minutesAgo: 1200,
    views: 3100,
  },
  {
    slug: "izmir-deprem-tatbikatinda-yogun-katilim",
    title: "İzmir'de deprem tatbikatına yoğun katılım",
    spot: "Okul ve iş yerlerinde senaryolar güncellendi.",
    categorySlug: "gundem",
    citySlug: "izmir",
    tagSlugs: [],
    authorId: "a1",
    heroAlt: "Acil durum ekipmanları",
    featured: false,
    breaking: false,
    minutesAgo: 1320,
    views: 8900,
  },
  {
    slug: "aydin-nazilli-sulama-kanalinda-bakim",
    title: "Nazilli'de sulama kanalında bakım çalışması",
    spot: "Su kayıplarını azaltmak için kapaklar yenilendi.",
    categorySlug: "ekonomi",
    citySlug: "aydin",
    tagSlugs: ["tarim"],
    authorId: "a2",
    heroAlt: "Sulama kanalı ve tarla",
    featured: false,
    breaking: false,
    minutesAgo: 1440,
    views: 990,
  },
  {
    slug: "denizli-yogun-bakim-kampanyasi-basladi",
    title: "Denizli'de yoğun bakım kapasitesi artırıldı",
    spot: "Yeni ekipman ve personel desteği ile süreçler hızlandı.",
    categorySlug: "saglik",
    citySlug: "denizli",
    tagSlugs: [],
    authorId: "a2",
    heroAlt: "Hastane koridoru",
    featured: false,
    breaking: false,
    minutesAgo: 1560,
    views: 5100,
  },
  {
    slug: "izmir-liman-bolgesinde-yuk-artisi",
    title: "İzmir liman bölgesinde yük hacmi arttı",
    spot: "Roro hatlarında planlı sefer sayısı yükseltildi.",
    categorySlug: "ekonomi",
    citySlug: "izmir",
    tagSlugs: [],
    authorId: "a2",
    heroAlt: "Liman ve vinç",
    featured: false,
    breaking: false,
    minutesAgo: 1680,
    views: 2760,
  },
  {
    slug: "mugla-fethiye-yamac-parasutu-rekor-katilim",
    title: "Fethiye'de yamaç paraşütü etkinliğinde rekor katılım",
    spot: "Güvenlik protokolleri sıkılaştırıldı; iniş alanları yeniden işaretlendi.",
    categorySlug: "turizm",
    citySlug: "mugla",
    tagSlugs: [],
    authorId: "a3",
    heroAlt: "Dağ ve paraşüt",
    featured: false,
    breaking: false,
    minutesAgo: 1800,
    views: 4450,
  },
  {
    slug: "izmir-kulturpark-konser-takvimi-aciklandi",
    title: "Kültürpark konser takvimi açıklandı",
    spot: "Yaz sezonu için yerli ve uluslararası sanatçılar duyuruldu.",
    categorySlug: "kultur-sanat",
    citySlug: "izmir",
    tagSlugs: ["festival"],
    authorId: "a3",
    heroAlt: "Konser ve kalabalık",
    featured: false,
    breaking: false,
    minutesAgo: 1920,
    views: 5600,
  },
  {
    slug: "manisa-spil-daginda-yangin-tatbikati",
    title: "Spil Dağı'nda yangın tatbikatı gerçekleştirildi",
    spot: "Orman işletmesi ve itfaiye koordinasyonu test edildi.",
    categorySlug: "asayis",
    citySlug: "manisa",
    tagSlugs: ["iklim"],
    authorId: "a1",
    heroAlt: "Orman ve yangın söndürme",
    featured: false,
    breaking: false,
    minutesAgo: 2040,
    views: 3320,
  },
  {
    slug: "manisa-kultur-sokagi-restorasyonunda-yeni-asama",
    title: "Manisa kültür sokağı restorasyonunda yeni aşama",
    spot: "Sokak döşemesi ve cephe onarımı tamamlandı.",
    categorySlug: "kultur-sanat",
    citySlug: "manisa",
    tagSlugs: [],
    authorId: "a3",
    heroAlt: "Tarihi çarşı sokak",
    featured: false,
    breaking: false,
    minutesAgo: 2160,
    views: 1890,
  },
];

function isoMinutesAgo(min: number): string {
  return new Date(Date.now() - min * 60 * 1000).toISOString();
}

function buildArticle(seed: Seed, index: number): ArticleWithRelations {
  const author = MOCK_AUTHORS.find((a) => a.id === seed.authorId)!;
  const category = CATEGORIES.find((c) => c.slug === seed.categorySlug)!;
  const city = CITIES.find((c) => c.slug === seed.citySlug)!;
  const tags = MOCK_TAGS.filter((t) => seed.tagSlugs.includes(t.slug));
  const published = isoMinutesAgo(seed.minutesAgo + index);

  return {
    id: `art-${index + 1}`,
    slug: seed.slug,
    title: seed.title,
    spot: seed.spot,
    body_mdx: baseBody(seed.title),
    hero_image_url: unsplashAt(index),
    hero_alt: seed.heroAlt,
    author_id: author.id,
    status: "published",
    published_at: published,
    updated_at: published,
    view_count: seed.views,
    reading_time_min: Math.max(2, Math.round(seed.title.length / 40)),
    is_featured: seed.featured,
    is_breaking: seed.breaking,
    author,
    categories: [category],
    cities: [city],
    tags,
  };
}

export const MOCK_ARTICLES: ArticleWithRelations[] = seeds.map((s, i) =>
  buildArticle(s, i)
);

export const MOCK_BREAKING: BreakingNews[] = MOCK_ARTICLES.filter((a) => a.is_breaking)
  .slice(0, 5)
  .map((a, i) => ({
    id: `b${i + 1}`,
    title: a.title,
    link: `/haber/${a.slug}`,
    expires_at: null,
    position: i,
  }));

