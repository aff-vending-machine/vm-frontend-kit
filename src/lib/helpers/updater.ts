import { goto } from '$app/navigation';

export async function updateURL(kv: Record<string, string>, clear = true) {
  const params = clear ? new URLSearchParams() : new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(kv)) {
    params.set(key, value);
  }

  await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
}
