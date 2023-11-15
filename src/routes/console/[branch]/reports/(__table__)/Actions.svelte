<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/elements/buttons/Button.svelte';
  import type { Machine } from '$types/machine';

  export let source: Machine;

  $: link = (type: string) => {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('id', source.id.toString());
    params.sort();

    return `/console/${$page.params.branch}/reports/${type}?${params.toString()}`;
  };
</script>

<div class="flex justify-center space-x-2">
  <a href={link('stocks')} data-sveltekit-prefetch>
    <Button color="primary" outline>Stock</Button>
  </a>
  <a href={link('transactions')} data-sveltekit-prefetch>
    <Button color="primary" outline>Payment</Button>
  </a>
</div>
