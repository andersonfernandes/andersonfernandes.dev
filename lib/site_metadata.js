export default async function getSiteMeta() {
  const siteMeta = await import('../config.json')

  return siteMeta.default
}
