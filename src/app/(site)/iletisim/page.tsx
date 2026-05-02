import type { Metadata } from "next";
import { ContactForm } from "@/components/molecules/contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Ege Radar iletişim formu.",
};

export default function Page() {
  return (
    <div className="container-site py-10 lg:py-14">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight">İletişim</h1>
      <p className="mt-3 max-w-prose text-foreground-muted">
        Soru, öneri ve reklam talepleri için formu doldurun. Üretim ortamında e-posta
        gönderimi için Resend veya benzeri bir servis yapılandırın.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
