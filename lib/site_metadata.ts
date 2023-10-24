export type BlogMeta = {
  title: string;
  description: string;
};

export default async function getSiteMeta(): Promise<BlogMeta> {
  const siteMeta = await import("../config.json");

  return siteMeta.default;
}
