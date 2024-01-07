<script lang="ts">
  import { goto } from '$app/navigation';

  let { data } = $props();

  $effect(() => {
    if (data.options.branch.length === 1) {
      const key = data.options.branch[0].value;
      goto(`/portal/${key}`);
    } else {
      goto('/portal/all');
    }
  });
</script>

<svelte:head>
  <title>Portal | Vending Machine Portal</title>
</svelte:head>
