import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import useSWR from '$lib/stores/useSWR';
import type { AccessStore } from '$types/access';

export const swr = useSWR<AccessStore>();

export function login(node: HTMLFormElement) {
  const authService = AuthService.getInstance();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const remember = (data.get('remember') as string) === 'on';

    if (!username || !password) {
      return swr.failure('Username and password are required');
    }

    await swr.mutate(() => authService.login(username, password, remember));

    const token = get(swr).data;
    if (token) {
      access.set(token);
      await goto('/console');
    }
  };

  node.addEventListener('submit', handleSubmit);

  return {
    destroy() {
      node.removeEventListener('submit', handleSubmit);
    },
  };
}
