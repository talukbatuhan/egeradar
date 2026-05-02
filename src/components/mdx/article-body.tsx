import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { mdxBaseComponents } from "./shared-mdx";

const components: MDXRemoteProps["components"] = {
  ...mdxBaseComponents,
  h2: (props) => (
    <h2
      className="font-heading mt-10 text-2xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-heading mt-8 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props) => (
    <p
      className="mt-4 text-base leading-[1.75] text-foreground lg:text-[1.0625rem]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-accent pl-4 italic text-foreground-muted"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
      {...props}
    />
  ),
};

export function ArticleBody({
  source,
  serif,
}: {
  source: string;
  serif?: boolean;
}) {
  return (
    <div className={serif ? "article-body-serif drop-cap max-w-prose" : "drop-cap max-w-prose"}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
