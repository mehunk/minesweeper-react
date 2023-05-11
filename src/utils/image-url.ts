export function getImageUrl(name: string, path = '/src/assets/images/'): string {
  return new URL(`${path + name}`, import.meta.url).href
}
