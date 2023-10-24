export interface PostMeta {
  title: string;
  description: string;
  date: string;
  updated: string;
}

export interface Post extends PostMeta {
  slug: string;
}
