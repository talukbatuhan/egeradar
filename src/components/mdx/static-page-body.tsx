import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxBaseComponents } from "./shared-mdx";

export function StaticPageBody({ source }: { source: string }) {
  return (
    <div className="max-w-prose">
      <MDXRemote source={source} components={mdxBaseComponents} />
    </div>
  );
}
