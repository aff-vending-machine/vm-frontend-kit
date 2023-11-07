import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

const service = AuthService.getInstance();

export const load = (async () => {
  try {
    const token = await service.authenticated();
    access.set(token);
    return goto('/main/dashboard');
  } catch (e) {
    return goto('/login');
  }
}) satisfies PageLoad;
