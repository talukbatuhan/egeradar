"use client";

import { toast } from "sonner";

export function ShareButtons({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Bağlantı kopyalandı");
    } catch {
      toast.error("Kopyalanamadı");
    }
  }

  return (
    <div className={className}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        Paylaş
      </p>
      <ul className="flex flex-col gap-2">
        <li>
          <a
            href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span aria-hidden>X</span>
            <span className="sr-only">X&apos;te paylaş</span>
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/?text=${text}%20${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={`https://t.me/share/url?url=${encoded}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            Telegram
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={copy}
            className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            Bağlantıyı kopyala
          </button>
        </li>
      </ul>
    </div>
  );
}
