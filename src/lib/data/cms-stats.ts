import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type CmsDashboardStats = {
  articles: number;
  categories: number;
  cities: number;
  configured: boolean;
};

export async function getCmsDashboardStats(): Promise<CmsDashboardStats> {
  if (!isSupabaseConfigured()) {
    return { articles: 0, categories: 0, cities: 0, configured: false };
  }

  try {
    const supabase = await createClient();

    const [articlesRes, categoriesRes, citiesRes] = await Promise.all([
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("cities").select("*", { count: "exact", head: true }),
    ]);

    return {
      articles: articlesRes.count ?? 0,
      categories: categoriesRes.count ?? 0,
      cities: citiesRes.count ?? 0,
      configured: true,
    };
  } catch {
    return { articles: 0, categories: 0, cities: 0, configured: false };
  }
}
