/**
 * Supabase Edge Function — çift opt-in bülten (örnek iskelet).
 * Yerelde Next.js API route (@/app/api/newsletter) kullanılıyor.
 *
 * Deno deploy: supabase functions deploy subscribe --no-verify-jwt
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  const { email } = (await req.json()) as { email?: string };
  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = crypto.randomUUID().replace(/-/g, "");
  const { error } = await admin.from("newsletter_subscribers").insert({
    email: email.toLowerCase(),
    confirmed: false,
    confirm_token: token,
    ip_hash: "edge",
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
