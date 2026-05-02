import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-6xl font-black text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Sayfa bulunamadı</h1>
      <Link href="/" className="mt-6 text-primary underline">
        Anasayfaya dön
      </Link>
    </div>
  );
}
