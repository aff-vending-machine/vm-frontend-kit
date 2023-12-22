import { get } from 'svelte/store';

import { loadTranslations } from '$lib/i18n/translations';
import { AuthService } from '$lib/services/auth';
import { authenticate } from '$lib/stores/auth';
import language from '$lib/stores/language';

export const ssr = false;

const authAPI = AuthService.getInstance();

export async function load({ url }) {
  const checkTranslations = async (url: URL) => {
    const locale = language.reload();
    await loadTranslations(locale, url.pathname);
  };

  const checkAuthentication = async () => {
    try {
      await authAPI.authenticate();
      authenticate.enable();
    } catch (e) {
      authenticate.disable();
    }
  };

  await Promise.all([checkTranslations(url), checkAuthentication()]);

  return {
    isAuthenticated: get(authenticate),
  };
}
