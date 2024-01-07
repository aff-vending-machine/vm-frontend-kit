import { goto } from '$app/navigation';

export async function updateURL(kv: Record<string, string | number | undefined>, clear = true) {
  const params = clear ? new URLSearchParams() : new URLSearchParams(window.location.search);

  for (const [key, val] of Object.entries(kv)) {
    let value = val;
    if (value === undefined) {
      params.delete(key);
      continue;
    }
    if (typeof value === 'number') value = value.toString();
    params.set(key, value);
  }

  await goto(`?${params.toString()}`, { keepFocus: true, noScroll: true, invalidateAll: true });
}
