import language from '$lib/stores/language';
import { loadTranslations } from '$lib/translations';

export const ssr = false;

export async function load({ url }) {
  const { pathname } = url;
  const locale = language.reload();
  await loadTranslations(locale, pathname);
  return { pathname };
}
