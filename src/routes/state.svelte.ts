import { loadTranslations } from '$lib/i18n/translations';
import { AuthService } from '$lib/services/auth';
import { accessToken, language, profile, refreshToken } from '$lib/state.svelte';

export class Root {
  #authAPI = AuthService.getInstance();
  #path = '';

  constructor(path: string) {
    this.#path = path;

    this.#checkTranslations();
  }

  #checkTranslations = async () => {
    await loadTranslations(language.value ?? 'en', this.#path);
  };

  checkAuthentication = async () => {
    try {
      const result = await this.#authAPI.authenticate(accessToken.value, refreshToken.value);
      if (result) {
        accessToken.value = result.access_token;
        refreshToken.value = result.refresh_token;
        profile.value = result.profile;
      }
      return true;
    } catch (e) {
      accessToken.value = null;
      refreshToken.value = null;
      profile.value = null;
      return false;
    }
  };
}
