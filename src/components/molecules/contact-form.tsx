"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    if (payload.website) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Gönderilemedi");
      toast.success("Mesajınız alındı.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Ad Soyad
        </label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          E-posta
        </label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Gönderiliyor…" : "Gönder"}
      </Button>
    </form>
  );
}
