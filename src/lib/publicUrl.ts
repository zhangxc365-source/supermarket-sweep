/**
 * Resolve a path under Vite `public/` for dev and GitHub Pages subpaths.
 * e.g. `/?.png` ? `/supermarket-sweep/?.png` when base is set.
 */
export function publicUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
