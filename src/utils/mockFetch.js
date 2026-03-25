const cache = {}
export const mockFetch = async (resource) => {
  if (cache[resource]) return cache[resource]
  const mod = await import(`../data/${resource}.json`)
  await new Promise(r => setTimeout(r, 300))
  cache[resource] = mod.default
  return mod.default
}
