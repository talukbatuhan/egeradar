const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

/** Başlıktan URL parçası: küçük harf, tire, benzersizlik için ayrı sorgu gerekir. */
export function slugifyTitle(title: string): string {
  let s = title.trim();
  for (const [k, v] of Object.entries(TR_MAP)) {
    s = s.split(k).join(v);
  }
  s = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "haber";
}
