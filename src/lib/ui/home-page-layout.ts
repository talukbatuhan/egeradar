/**
 * Ana sayfa dikey ritim ve içerik hizası — kategori blokları, üçlü grid, reklam.
 */

/** max-w-6xl + yatay padding (navbar/carousel hariç ana içerik) */
export const HOME_CONTENT_GUTTER =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8" as const;

/** Ana bölümler arası nefes */
export const HOME_SECTION_SPACING = "py-12 lg:py-16" as const;

/** Reklam şeritleri — biraz daha sıkı */
export const HOME_AD_SPACING = "py-8 lg:py-10" as const;

/** Kart / liste linkleri — klavye odağı */
export const HOME_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background" as const;
