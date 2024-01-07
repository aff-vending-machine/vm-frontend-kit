import { goto } from '$app/navigation';
import { AuthService } from '$lib/services/auth';
import { accessToken, profile, refreshToken, rememberMe } from '$lib/state.svelte';

const authAPI = AuthService.getInstance();

export class Auth {
  constructor() {
    $effect.pre(() => {
      authAPI.logout(accessToken.value || '');
      accessToken.value = null;
      refreshToken.value = null;
      rememberMe.value = null;
      profile.value = null;
    });

    $effect(() => {
      const timeoutID = setTimeout(() => {
        goto('/');
      }, 5000);

      return () => {
        clearTimeout(timeoutID);
      };
    });
  }

  async onReturnHome(e: MouseEvent) {
    e.preventDefault();

    await goto('/');
  }
}
