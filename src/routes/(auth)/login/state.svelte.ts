import { goto } from '$app/navigation';
import type { LoginFormData } from '$lib/components/ui/login/forms';
import { AuthService } from '$lib/services/auth';
import { accessToken, profile, refreshToken, rememberMe } from '$lib/state.svelte';

const authAPI = AuthService.getInstance();

export class LoginState {
  #loading = $state(false);
  #error = $state<string>();

  constructor(isAuthenticated: boolean) {
    if (isAuthenticated) {
      goto('/portal');
    }
  }

  onLogin = async ({ username, password, remember }: LoginFormData) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await authAPI.login(username, password);
      accessToken.value = result.access_token;
      refreshToken.value = remember ? result.refresh_token : null;
      rememberMe.value = remember ?? null;
      profile.value = result.profile;

      goto('/portal');
    } catch (e) {
      accessToken.value = null;
      refreshToken.value = null;
      rememberMe.value = null;
      profile.value = null;

      const msg = (e as Error).message;
      if (msg.includes('Failed to fetch')) {
        this.#error = 'Unable to connect server';
      } else {
        this.#error = msg;
      }
    } finally {
      this.#loading = false;
    }
  };

  get loading(): boolean {
    return this.#loading;
  }

  get error(): string | undefined {
    return this.#error;
  }
}
