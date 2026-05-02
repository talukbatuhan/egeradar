"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils/cn";

type Variant = "inline" | "footer" | "modal";

export function NewsletterForm({
  variant = "inline",
  onSuccess,
  className,
}: {
  variant?: Variant;
  onSuccess?: () => void;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hp, setHp] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast.error("KVKK aydınlatmasını onaylayın.");
      return;
    }
    if (hp) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: hp }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Bir hata oluştu");
      }
      toast.success("Gelen kutunuzu kontrol edin (onay bağlantısı).");
      setEmail("");
      setConsent(false);
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gönderilemedi");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "modal") {
    return (
      <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
        <input type="hidden" name="website" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          autoComplete="email"
          aria-label="E-posta"
        />
        <label className="flex items-start gap-2 text-left text-sm text-foreground-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 rounded border-border"
          />
          <span>
            <a href="/kvkk" className="underline">
              KVKK metnini
            </a>{" "}
            okudum, onaylıyorum.
          </span>
        </label>
        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Gönderiliyor…" : "Abone ol"}
        </Button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center",
          className
        )}
      >
        <input type="hidden" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} className="hidden" aria-hidden />
        <div className="flex w-full max-w-md flex-1 flex-col gap-2 text-left sm:w-auto">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            autoComplete="email"
            aria-label="E-posta"
            className="min-w-0"
          />
          <label className="flex items-start gap-2 text-xs text-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 rounded border-border"
            />
            <span>
              <a href="/kvkk" className="underline">
                KVKK
              </a>{" "}
              onayı
            </span>
          </label>
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "…" : "Abone ol"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <input type="hidden" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} className="hidden" aria-hidden />
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta"
        className="sm:max-w-xs"
        autoComplete="email"
        aria-label="Bülten e-postası"
      />
      <label className="flex items-center gap-2 text-xs sm:order-3 sm:basis-full">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="rounded border-border"
        />
        <span>
          <a href="/kvkk" className="underline">
            KVKK
          </a>
        </span>
      </label>
      <Button type="submit" variant="secondary" disabled={loading}>
        {loading ? "…" : "Kaydol"}
      </Button>
    </form>
  );
}
