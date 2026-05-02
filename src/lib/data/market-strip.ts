/** Statik demo piyasa verisi — canlı API ile değiştirilebilir */
export type MarketQuote = {
  id: string;
  label: string;
  value: string;
  changePct: number;
};

export const MOCK_MARKET_QUOTES: MarketQuote[] = [
  { id: "xu100", label: "BIST 100", value: "9.847,32", changePct: 0.42 },
  { id: "usd", label: "DOLAR", value: "34,12", changePct: -0.18 },
  { id: "eur", label: "EURO", value: "36,58", changePct: 0.09 },
  { id: "gold", label: "GRAM ALTIN", value: "3.124,50", changePct: 0.65 },
];
