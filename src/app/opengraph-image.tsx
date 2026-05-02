import { ImageResponse } from "next/og";

export const alt = "Ege Radar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f4c81 0%, #0b1220 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>Ege Radar</div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.9 }}>
          Ege bölgesi haberleri — hızlı, erişilebilir, SEO odaklı
        </div>
      </div>
    ),
    { ...size }
  );
}
