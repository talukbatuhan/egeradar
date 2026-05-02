import Link from "next/link";
import { ArticleCreateForm } from "@/components/cms/article-create-form";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CmsNewArticlePage() {
  if (!isSupabaseConfigured()) {
    return (
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-slate-100">Yeni haber</h1>
          <Link
            href="/cms/haberler"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Haber listesine dön
          </Link>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Supabase ortam değişkenleri tanımlı değil; form kullanılamaz.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const [catRes, cityRes] = await Promise.all([
    supabase.from("categories").select("id, name").order("name"),
    supabase.from("cities").select("id, name").order("name"),
  ]);

  const categories = (catRes.data ?? []).map((r) => ({ id: r.id, name: r.name }));
  const cities = (cityRes.data ?? []).map((r) => ({ id: r.id, name: r.name }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-slate-100">Yeni haber</h1>
        <Link
          href="/cms/haberler"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Haber listesine dön
        </Link>
      </div>
      {(catRes.error || cityRes.error) && (
        <p className="mb-4 text-sm text-red-600 dark:text-red-400">
          Kategori veya şehir listesi yüklenemedi. Supabase bağlantınızı kontrol edin.
        </p>
      )}
      <ArticleCreateForm categories={categories} cities={cities} />
    </div>
  );
}
