export type Author = {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  role: string | null;
  social_links: Record<string, string> | null;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  parent_id: string | null;
  article_count?: number;
};

export type City = {
  id: string;
  slug: string;
  name: string;
  plate_code: string;
};

export type Tag = {
  id: string;
  slug: string;
  name: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  spot: string;
  body_mdx: string;
  hero_image_url: string;
  hero_alt: string;
  author_id: string;
  status: "draft" | "published";
  published_at: string;
  updated_at: string;
  view_count: number;
  reading_time_min: number;
  is_featured: boolean;
  is_breaking: boolean;
};

export type ArticleWithRelations = Article & {
  author: Author;
  categories: Category[];
  cities: City[];
  tags: Tag[];
};

export type BreakingNews = {
  id: string;
  title: string;
  link: string;
  expires_at: string | null;
  position: number;
};

export type AdSlotRow = {
  id: string;
  slug: string;
  size: string;
  page: string;
  position: string;
  provider: string;
  code: string | null;
  active: boolean;
};
