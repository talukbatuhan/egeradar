import { getCmsDashboardStats } from "@/lib/data/cms-stats";

export default async function CmsHomePage() {
  const stats = await getCmsDashboardStats();

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        Özet
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Supabase üzerindeki kayıt sayıları.
      </p>

      {!stats.configured ? (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          Supabase yapılandırılmadı. Yerel istatistikler için{" "}
          <code className="rounded bg-white/80 px-1 dark:bg-slate-800">.env.local</code> içinde{" "}
          <code className="rounded bg-white/80 px-1 dark:bg-slate-800">NEXT_PUBLIC_SUPABASE_URL</code> ve{" "}
          <code className="rounded bg-white/80 px-1 dark:bg-slate-800">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          tanımlayın.
        </p>
      ) : null}

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        <li>
          <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Haberler
            </p>
            <p className="mt-2 font-heading text-3xl font-extrabold tabular-nums text-slate-900 dark:text-slate-100">
              {stats.articles}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">articles tablosu</p>
          </article>
        </li>
        <li>
          <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Kategoriler
            </p>
            <p className="mt-2 font-heading text-3xl font-extrabold tabular-nums text-slate-900 dark:text-slate-100">
              {stats.categories}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">categories tablosu</p>
          </article>
        </li>
        <li>
          <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Şehirler
            </p>
            <p className="mt-2 font-heading text-3xl font-extrabold tabular-nums text-slate-900 dark:text-slate-100">
              {stats.cities}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">cities tablosu</p>
          </article>
        </li>
      </ul>
    </div>
  );
}
