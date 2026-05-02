import { Avatar } from "@/components/atoms/avatar";
import type { Author } from "@/lib/types";

export function AuthorByline({
  author,
  updatedAt,
}: {
  author: Author;
  updatedAt: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-muted/50 p-4 ring-1 ring-border">
      <Avatar src={author.avatar_url} alt={author.name} size={56} />
      <div>
        <p className="font-heading text-lg font-bold text-foreground">{author.name}</p>
        {author.role ? (
          <p className="text-sm text-foreground-muted">{author.role}</p>
        ) : null}
        <p className="mt-1 text-xs text-foreground-muted">
          Güncelleme:{" "}
          <time dateTime={updatedAt}>
            {new Date(updatedAt).toLocaleString("tr-TR")}
          </time>
        </p>
      </div>
    </div>
  );
}
