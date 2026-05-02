import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Manrope,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterProvider } from "@/components/providers/toaster-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["700", "800"],
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600"],
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ege Radar — Ege Bölgesi Haberleri",
    template: "%s | Ege Radar",
  },
  description:
    "İzmir, Aydın, Muğla ve tüm Ege illerinden güncel haberler, ekonomi, spor ve yaşam.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ege Radar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider>
          {children}
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
