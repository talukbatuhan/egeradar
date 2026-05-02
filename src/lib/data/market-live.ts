import { z } from "zod";
import type { MarketQuote } from "@/lib/data/market-strip";
import { MOCK_MARKET_QUOTES } from "@/lib/data/market-strip";

const BIGPARA_HEADER =
  "https://api.bigpara.hurriyet.com.tr/doviz/headerlist" as const;

const rowSchema = z.object({
  SEMBOL: z.string(),
  KAPANIS: z.number(),
  SATIS: z.number().optional(),
  YUZDEDEGISIM: z.number(),
});

const responseSchema = z.object({
  data: z.array(rowSchema),
});

const ROWS: readonly {
  sembol: string;
  id: MarketQuote["id"];
  label: string;
  /** BIST gibi büyük sayılar için kesir basamağı */
  fractionDigits: number;
}[] = [
  { sembol: "XU100", id: "xu100", label: "BIST 100", fractionDigits: 2 },
  { sembol: "USDTRY", id: "usd", label: "DOLAR", fractionDigits: 4 },
  { sembol: "EURTRY", id: "eur", label: "EURO", fractionDigits: 4 },
  { sembol: "GLDGR", id: "gold", label: "GRAM ALTIN", fractionDigits: 2 },
];

function formatTr(value: number, fractionDigits: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function pickPrice(row: z.infer<typeof rowSchema>): number {
  const s = row.SATIS;
  if (typeof s === "number" && Number.isFinite(s) && s > 0) return s;
  return row.KAPANIS;
}

/**
 * Bigpara (Hürriyet) herkese açık liste uç noktası — borsa/kur/gram altın.
 * Üretimde kesin SLA yok; hata veya şema değişiminde mock kullanılır.
 */
export async function getLiveMarketQuotes(): Promise<MarketQuote[]> {
  try {
    const res = await fetch(BIGPARA_HEADER, {
      headers: { Accept: "application/json" },
      next: { revalidate: 120 },
    });
    if (!res.ok) return MOCK_MARKET_QUOTES;

    const json: unknown = await res.json();
    const parsed = responseSchema.safeParse(json);
    if (!parsed.success) return MOCK_MARKET_QUOTES;

    const bySymbol = new Map(
      parsed.data.data.map((r) => [r.SEMBOL.toUpperCase(), r])
    );

    const out: MarketQuote[] = [];
    for (const cfg of ROWS) {
      const row = bySymbol.get(cfg.sembol.toUpperCase());
      if (!row) continue;
      const price = pickPrice(row);
      if (!Number.isFinite(price)) continue;
      out.push({
        id: cfg.id,
        label: cfg.label,
        value: formatTr(price, cfg.fractionDigits),
        changePct: row.YUZDEDEGISIM,
      });
    }

    return out.length ? out : MOCK_MARKET_QUOTES;
  } catch {
    return MOCK_MARKET_QUOTES;
  }
}
