import type { Category, City } from "@/lib/types";

/** Yalnızca beş il: İzmir, Manisa, Muğla, Denizli, Aydın */
export const CITIES: City[] = [
  { id: "1", slug: "izmir", name: "İzmir", plate_code: "35" },
  { id: "2", slug: "manisa", name: "Manisa", plate_code: "45" },
  { id: "3", slug: "mugla", name: "Muğla", plate_code: "48" },
  { id: "4", slug: "denizli", name: "Denizli", plate_code: "20" },
  { id: "5", slug: "aydin", name: "Aydın", plate_code: "09" },
];

export const CATEGORIES: Category[] = [
  {
    id: "c1",
    slug: "gundem",
    name: "Gündem",
    description: "Ege'den güncel gelişmeler.",
    icon: "newspaper",
    parent_id: null,
  },
  {
    id: "c2",
    slug: "ekonomi",
    name: "Ekonomi",
    description: "İş dünyası ve yatırım.",
    icon: "chart",
    parent_id: null,
  },
  {
    id: "c3",
    slug: "kultur-sanat",
    name: "Kültür-Sanat",
    description: "Festivaller ve kültür.",
    icon: "palette",
    parent_id: null,
  },
  {
    id: "c4",
    slug: "spor",
    name: "Spor",
    description: "Spor haberleri.",
    icon: "trophy",
    parent_id: null,
  },
  {
    id: "c5",
    slug: "yasam",
    name: "Yaşam",
    description: "Şehir hayatı.",
    icon: "heart",
    parent_id: null,
  },
  {
    id: "c6",
    slug: "cevre",
    name: "Çevre",
    description: "İklim ve sürdürülebilirlik.",
    icon: "leaf",
    parent_id: null,
  },
  {
    id: "c7",
    slug: "turizm",
    name: "Turizm",
    description: "Ege kıyıları ve destinasyonlar.",
    icon: "map",
    parent_id: null,
  },
  {
    id: "c8",
    slug: "asayis",
    name: "Asayiş",
    description: "Güvenlik ve adli haberler.",
    icon: "shield",
    parent_id: null,
  },
  {
    id: "c9",
    slug: "egitim",
    name: "Eğitim",
    description: "Okullar ve üniversiteler.",
    icon: "book",
    parent_id: null,
  },
  {
    id: "c10",
    slug: "saglik",
    name: "Sağlık",
    description: "Sağlık ve bakım.",
    icon: "cross",
    parent_id: null,
  },
  {
    id: "c11",
    slug: "teknoloji",
    name: "Teknoloji",
    description: "Teknoloji ve inovasyon.",
    icon: "cpu",
    parent_id: null,
  },
  {
    id: "c12",
    slug: "magazin",
    name: "Magazin",
    description: "Magazin ve yaşam stili.",
    icon: "star",
    parent_id: null,
  },
];

/** Ana navbar’da gösterilen şehirler (sıra sabit) */
export const PRIMARY_NAV_CITY_SLUGS = [
  "izmir",
  "manisa",
  "mugla",
  "denizli",
  "aydin",
] as const;

/** Alt navbar’da gösterilecek kategori sırası (Anasayfa / şehir / son dakika) */
export const SUBNAV_CATEGORY_SLUGS: string[] = [
  "gundem",
  "ekonomi",
  "spor",
  "teknoloji",
  "magazin",
  "yasam",
  "turizm",
  "egitim",
  "saglik",
  "kultur-sanat",
  "asayis",
  "cevre",
];

export function primaryNavCities(): City[] {
  return PRIMARY_NAV_CITY_SLUGS.map((slug) => CITIES.find((c) => c.slug === slug)).filter(
    Boolean
  ) as City[];
}

export function subnavCategories(): Category[] {
  return SUBNAV_CATEGORY_SLUGS.map((slug) => CATEGORIES.find((c) => c.slug === slug)).filter(
    Boolean
  ) as Category[];
}

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Üst koyu şerit: şehir sırası (referans tasarım — Aydın / Denizli / Muğla) */
export const NAVBAR_TOP_CITY_SLUGS = [
  "izmir",
  "manisa",
  "aydin",
  "denizli",
  "mugla",
] as const;

export function navbarTopCities(): City[] {
  return NAVBAR_TOP_CITY_SLUGS.map((slug) => CITIES.find((c) => c.slug === slug)).filter(
    Boolean
  ) as City[];
}

/** Alt şerit: navbar kategorileri (sıra sabit) */
export type NavBarBottomItem = {
  label: string;
  categorySlug: string;
};

export const NAVBAR_BOTTOM_ITEMS: NavBarBottomItem[] = [
  { label: "GÜNDEM", categorySlug: "gundem" },
  { label: "EKONOMİ", categorySlug: "ekonomi" },
  { label: "SPOR", categorySlug: "spor" },
  { label: "TEKNOLOJİ", categorySlug: "teknoloji" },
  { label: "YAŞAM", categorySlug: "yasam" },
  { label: "TURİZM", categorySlug: "turizm" },
  { label: "EĞİTİM", categorySlug: "egitim" },
  { label: "SAĞLIK", categorySlug: "saglik" },
  { label: "ASAYİŞ", categorySlug: "asayis" },
];
