export interface PostRawData {
  title: string;
  description: string;
  date: string;
  updated: string;
}

export interface Post extends PostRawData {
  slug: string;
}
