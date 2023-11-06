import { AuthService } from '$lib/services/auth';
import { useSWR } from '$lib/stores/swr';
import access, { type TokenData } from '$lib/stores/access';
import notification from '$lib/stores/notification';
import { goto } from '$app/navigation';

const authService = AuthService.getInstance();

export const swr = useSWR<TokenData>();

export const actions = {
  login: async (event: SubmitEvent) => {
    swr.init();

    try {
      const form = event.target as HTMLFormElement;
      const data = new FormData(form);

      const username = data.get('username')?.toString() || '';
      const password = data.get('password')?.toString() || '';
      const remember = data.get('remember')?.toString() === 'on';

      if (!username || !password) {
        return swr.failure('Username and password are required');
      }

      const token = await authService.login(username, password, remember);
      access.set(token);

      notification.add('success', 'Login Successful');
      swr.success(token);
      return goto('/main/dashboard', { replaceState: true, noScroll: true });
    } catch (e: unknown) {
      notification.add('error', 'Login Failed');
      return swr.failure(e);
    }
  },
};
