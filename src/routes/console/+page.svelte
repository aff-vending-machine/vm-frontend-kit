<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';
  import { genKey } from '$lib/utils/generate';

  export let data;

  onMount(async () => {
    if (data.options.branches.length === 1) {
      const key = genKey(data.options.branches[0].label);
      await goto(`/console/${key}`);
    } else {
      await goto('/console/all');
    }
  });
</script>
