import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxBaseComponents: MDXRemoteProps["components"] = {
  h1: (props) => (
    <h1
      className="font-heading mt-0 text-3xl font-extrabold tracking-tight text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-heading mt-8 text-2xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 text-base leading-relaxed text-foreground" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-primary underline-offset-2 hover:underline"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
  li: (props) => <li className="text-foreground" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props) => <em className="italic text-foreground-muted" {...props} />,
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-muted px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => <td className="border border-border px-3 py-2" {...props} />,
};
