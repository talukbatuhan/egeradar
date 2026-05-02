import type { Metadata } from "next";
import { StaticPageBody } from "@/components/mdx/static-page-body";
import { loadMarkdown } from "@/lib/content/load-markdown";

export const metadata: Metadata = { title: "Yayın İlkeleri" };

export default function Page() {
  const { content } = loadMarkdown("yayin-ilkeleri");
  return (
    <div className="container-site py-10 lg:py-14">
      <StaticPageBody source={content} />
    </div>
  );
}
