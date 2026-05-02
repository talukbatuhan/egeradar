import Link from "next/link";

export default function CmsHaberlerPage() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-slate-100">Haberler</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Liste ve düzenleme yakında eklenecek.</p>
        </div>
        <Link
          href="/cms/haberler/yeni"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Yeni haber
        </Link>
      </div>
    </div>
  );
}
