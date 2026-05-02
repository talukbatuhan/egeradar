import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const root =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${root}/sitemap.xml`,
    host: root,
  };
}
