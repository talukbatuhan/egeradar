import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üye girişi",
  description: "Ege Radar üye girişi",
};

export default function GirisPage() {
  return (
    <div className="container-site py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight">Üye girişi</h1>
      <p className="mt-4 max-w-lg text-foreground-muted">
        Giriş alanı yakında açılacak. Şimdilik haberleri ücretsiz okuyabilirsiniz.
      </p>
    </div>
  );
}
