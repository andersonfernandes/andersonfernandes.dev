export default async function getSiteMeta(): Promise<{
  title: string;
  description: string;
}> {
  const siteMeta = await import("../config.json");

  return siteMeta.default;
}
