import { loadTranslations } from '$lib/i18n/translations';
import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import language from '$lib/stores/language';
import { genError } from '$lib/utils/generate';

export const ssr = false;
export const prerender = true;

const authService = AuthService.getInstance();

export async function load({ url }) {
  const locale = language.reload();
  await loadTranslations(locale, url.pathname);

  try {
    const token = await authService.authenticate();
    access.set(token);
    return { isAuthenticated: true };
  } catch (e) {
    return { isAuthenticated: false, error: genError(e) };
  }
}
