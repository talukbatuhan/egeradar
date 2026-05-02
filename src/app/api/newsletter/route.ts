import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

const schema = z.object({
  email: z.string().email(),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz e-posta" }, { status: 422 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const confirmToken = randomBytes(32).toString("hex");
  const ipHash = "local-dev";

  if (!url || !serviceKey) {
    console.info("[newsletter] Supabase yok — örnek yanıt:", parsed.data.email);
    return NextResponse.json({
      ok: true,
      message:
        "Geliştirme modu: Supabase ve SERVICE_ROLE anahtarını ekleyin; onay e-postası için Resend yapılandırın.",
    });
  }

  const admin = createClient(url, serviceKey);
  const { error } = await admin.from("newsletter_subscribers").insert({
    email: parsed.data.email.toLowerCase(),
    confirmed: false,
    confirm_token: confirmToken,
    ip_hash: ipHash,
  });

  if (error?.code === "23505") {
    return NextResponse.json({ error: "Bu adres zaten kayıtlı." }, { status: 409 });
  }
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const confirmLink = `${base}/confirm-newsletter?token=${confirmToken}`;
  console.info("[newsletter] Onay bağlantısı (Resend için kopyalayın):", confirmLink);

  return NextResponse.json({ ok: true });
}
