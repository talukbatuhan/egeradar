import { SkipLink } from "@/components/atoms/skip-link";
import { BreakingTicker } from "@/components/organisms/breaking-ticker";
import { MarketTicker } from "@/components/organisms/market-ticker";
import {
  NewsHeroCarousel,
  type NewsCarouselSlide,
} from "@/components/organisms/news-hero-carousel";
import { SiteFooter } from "@/components/organisms/site-footer";
import { Navbar } from "@/components/organisms/navbar";
import { getHomeArticles } from "@/lib/data/articles";
import { getLiveMarketQuotes } from "@/lib/data/market-live";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [articles, marketQuotes] = await Promise.all([
    getHomeArticles(),
    getLiveMarketQuotes(),
  ]);
  const tickerItems = articles.slice(0, 10).map((a) => ({
    id: a.id,
    title: a.title,
    href: `/haber/${a.slug}`,
  }));
  const carouselSlides: NewsCarouselSlide[] = articles.slice(0, 6).map((a) => ({
    id: a.id,
    title: a.title,
    spot: a.spot,
    href: `/haber/${a.slug}`,
    imageUrl: a.hero_image_url,
    imageAlt: a.hero_alt,
  }));

  return (
    <>
      <SkipLink />
      <Navbar />
      <BreakingTicker items={tickerItems} />
      <MarketTicker quotes={marketQuotes} />
      <NewsHeroCarousel slides={carouselSlides} />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
