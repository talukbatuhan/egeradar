import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
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
    return NextResponse.json({ error: "Form doğrulanamadı" }, { status: 422 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  /* Üretimde: Resend / Supabase tablo / ticket sistemi */
  console.info("[contact]", parsed.data);

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NEWSLETTER_FROM_EMAIL ?? "noreply@example.com",
          to: process.env.CONTACT_TO_EMAIL,
          subject: `İletişim: ${parsed.data.name}`,
          html: `<p>${parsed.data.email}</p><p>${parsed.data.message}</p>`,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return NextResponse.json({ ok: true });
}
