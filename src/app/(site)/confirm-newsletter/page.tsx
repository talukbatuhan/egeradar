import { createClient } from "@supabase/supabase-js";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ConfirmNewsletterPage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">Geçersiz bağlantı</h1>
      </div>
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const admin = createClient(url, key);
    const { data, error } = await admin
      .from("newsletter_subscribers")
      .update({ confirmed: true, confirmed_at: new Date().toISOString() })
      .eq("confirm_token", token)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      return (
        <div className="container-site py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Onaylanamadı</h1>
          <p className="mt-2 text-foreground-muted">Bağlantı süresi dolmuş veya geçersiz olabilir.</p>
        </div>
      );
    }
  }

  return (
    <div className="container-site py-20 text-center">
      <h1 className="font-heading text-2xl font-bold">Bülten onaylandı</h1>
      <p className="mt-2 text-foreground-muted">Teşekkürler — Ege Radar özetlerini e-postanızda göreceksiniz.</p>
    </div>
  );
}
