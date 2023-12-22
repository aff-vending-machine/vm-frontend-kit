import { AuthService } from '$lib/services/auth';
import { authenticate } from '$lib/stores/auth';
import { createSWR } from '$lib/stores/swr.svelte';

const authAPI = AuthService.getInstance();

export function createAuthSWR() {
  const swr = createSWR();

  async function login(username: string, password: string, remember?: boolean) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    await swr.mutate(() => authAPI.login(username, password, remember));
    if (swr.value.data) authenticate.enable();
  }

  return {
    get swr() {
      return swr.value;
    },
    login,
  };
}
