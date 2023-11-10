import { AuthService } from '$lib/services/auth';
import access from '$lib/stores/access';
import { goto } from '$app/navigation';

export async function load() {
  try {
    const token = await AuthService.getInstance().authenticate();
    access.set(token);
    return goto('/console');
  } catch (e) {
    return goto('/login');
  }
}
