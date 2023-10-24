export type SiteMetadata = {
  title: string;
  description: string;
};

export default async function getSiteMetadata(): Promise<SiteMetadata> {
  const siteMeta = await import("../config.json");

  return siteMeta.default;
}
