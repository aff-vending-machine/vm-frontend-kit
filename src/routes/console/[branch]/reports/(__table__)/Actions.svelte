<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/elements/buttons/Button.svelte';
  import type { MachineReport } from '$types/report';

  export let source: MachineReport;
  export let index: number;

  $: _ = index;

  $: link = (type: string) => {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('id', source.id.toString());
    params.sort();

    return `/console/${$page.params.branch}/reports/${type}?${params.toString()}`;
  };
</script>

<div class="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <a href={link('stocks')} data-sveltekit-prefetch>
    <Button class="w-full" color="primary" outline>Stock</Button>
  </a>
  <a href={link('transactions')} data-sveltekit-prefetch>
    <Button class="w-full" color="primary" outline>Payment</Button>
  </a>
</div>
