import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export function loadMarkdown(slug: string): { content: string; title?: string } {
  const file = path.join(process.cwd(), "content", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return {
    content,
    title: typeof data.title === "string" ? data.title : undefined,
  };
}
