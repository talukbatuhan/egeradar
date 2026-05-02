import { cityBySlug } from "@/lib/data/constants";
import type { NavBarBottomItem } from "@/lib/data/constants";

/** /sehir/[il] veya /sehir/[il]/[kategori] için geçerli il slug'ı */
export function parseNavbarCitySlug(pathname: string): string | undefined {
  const m = pathname.match(/^\/sehir\/([^/]+)/);
  const slug = m?.[1];
  if (!slug || !cityBySlug(slug)) return undefined;
  return slug;
}

export function navbarBottomHref(
  activeCitySlug: string | undefined,
  item: NavBarBottomItem
): string {
  if (activeCitySlug) {
    return `/sehir/${activeCitySlug}/${item.categorySlug}`;
  }
  return `/kategori/${item.categorySlug}`;
}

export function navbarBottomIsActive(
  pathname: string,
  activeCitySlug: string | undefined,
  item: NavBarBottomItem
): boolean {
  if (activeCitySlug) {
    const base = `/sehir/${activeCitySlug}/${item.categorySlug}`;
    return pathname === base || pathname.startsWith(`${base}?`);
  }

  const base = `/kategori/${item.categorySlug}`;
  return pathname === base || pathname.startsWith(`${base}?`);
}
