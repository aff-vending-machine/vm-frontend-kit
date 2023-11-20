import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import useSWR from '$lib/stores/useSWR';
import type { AccessStore } from '$types/access';

const authAPI = AuthService.getInstance();

export const swr = useSWR<AccessStore>();

export const handle = {
  submit: async (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const remember = (data.get('remember') as string) === 'on';

    if (!username || !password) {
      return swr.failure('Username and password are required');
    }

    await swr.mutate(() => authAPI.login(username, password, remember));

    const token = get(swr).data;
    if (token) {
      access.set(token);
      await goto('/console');
    }
  },
};
