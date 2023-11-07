import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import type { PageLoad } from '../$types';
import { goto } from '$app/navigation';

const authService = AuthService.getInstance();

export const load = (async () => {
  try {
    const token = await authService.authenticated();
    access.set(token);
  } catch (e) {
    return goto('/login');
  }
}) satisfies PageLoad;
