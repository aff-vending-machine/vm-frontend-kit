<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';

  export let data;

  onMount(async () => {
    if (data.options.branches.length === 1) {
      const key = data.options.branches[0].data;
      await goto(`/console/${key}`);
    } else {
      await goto('/console/all');
    }
  });
</script>
