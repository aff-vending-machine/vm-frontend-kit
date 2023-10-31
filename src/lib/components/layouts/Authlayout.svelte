<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthService } from '$lib/services/auth';
  import { access } from '$lib/stores/access';
  import { onMount } from 'svelte';

  const service = AuthService.getInstance();

  onMount(async () => {
    try {
      const token = await service.authenticated();
      access.set(token);
    } catch (e) {
      goto('/login', { replaceState: true, noScroll: true });
    }
  });
</script>

<slot />
