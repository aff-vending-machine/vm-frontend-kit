import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import language from '$lib/stores/language';
import { loadTranslations } from '$lib/translations';

export const ssr = false;

const authService = AuthService.getInstance();

export async function load({ url }) {
  const locale = language.reload();
  await loadTranslations(locale, url.pathname);

  try {
    const token = await authService.authenticate();
    access.set(token);
    return { isAuthenticated: true };
  } catch (error) {
    return { isAuthenticated: false };
  }
}
