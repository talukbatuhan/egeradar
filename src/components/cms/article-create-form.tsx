"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createArticle,
  type CreateArticleState,
} from "@/app/(cms)/cms/haberler/yeni/actions";

const initialState: CreateArticleState = { error: null, fieldErrors: {} };

type Option = { id: string; name: string };

export function ArticleCreateForm({
  categories,
  cities,
}: {
  categories: Option[];
  cities: Option[];
}) {
  const [state, formAction, isPending] = useActionState(createArticle, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
        >
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={500}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(state.fieldErrors.title)}
            aria-describedby={state.fieldErrors.title ? "title-error" : undefined}
          />
          {state.fieldErrors.title ? (
            <p id="title-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {state.fieldErrors.title}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="summary" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Özet
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(state.fieldErrors.summary)}
          />
          {state.fieldErrors.summary ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.summary}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            İçerik
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(state.fieldErrors.content)}
          />
          {state.fieldErrors.content ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.content}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Kategori
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            defaultValue=""
            aria-invalid={Boolean(state.fieldErrors.category_id)}
          >
            <option value="" disabled>
              Seçin…
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {state.fieldErrors.category_id ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.category_id}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="city_id" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Şehir
          </label>
          <select
            id="city_id"
            name="city_id"
            required
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            defaultValue=""
            aria-invalid={Boolean(state.fieldErrors.city_id)}
          >
            <option value="" disabled>
              Seçin…
            </option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {state.fieldErrors.city_id ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.city_id}</p>
          ) : null}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold text-slate-800 dark:text-slate-200">Durum</legend>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <input type="radio" name="status" value="draft" defaultChecked className="text-primary" />
              Taslak
            </label>
            <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <input type="radio" name="status" value="published" className="text-primary" />
              Yayında
            </label>
          </div>
          {state.fieldErrors.status ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.status}</p>
          ) : null}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="featured_image" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Kapak fotoğrafı
          </label>
          <input
            id="featured_image"
            name="featured_image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:font-semibold file:text-primary dark:text-slate-400 dark:file:bg-primary/20"
            aria-invalid={Boolean(state.fieldErrors.featured_image)}
          />
          {state.fieldErrors.featured_image ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{state.fieldErrors.featured_image}</p>
          ) : (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">İsteğe bağlı. En fazla 5 MB, JPEG/PNG/WebP/GIF.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <Link
          href="/cms/haberler"
          className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
        >
          İptal
        </Link>
      </div>
    </form>
  );
}
