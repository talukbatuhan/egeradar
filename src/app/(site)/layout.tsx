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
import { MOCK_BREAKING } from "@/lib/data/mock";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerItems = MOCK_BREAKING.map((b) => ({
    id: b.id,
    title: b.title,
    href: b.link,
  }));

  const articles = await getHomeArticles();
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
      <MarketTicker />
      <NewsHeroCarousel slides={carouselSlides} />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
