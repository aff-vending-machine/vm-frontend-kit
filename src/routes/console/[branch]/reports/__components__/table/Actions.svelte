<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineReport } from '$types/report';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: MachineReport;

  $: link = (type: string) => {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('machine_id', source.id.toString());
    if (type === 'stocks') params.set('group', 'true');
    params.sort();

    return `/console/${$page.params.branch}/reports/${type}?${params.toString()}`;
  };
</script>

<div class="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <a href={link('stocks')} data-sveltekit-prefetch>
    <Button class="w-full" color="primary" outline>{$t('common.button.stock')}</Button>
  </a>
  <a href={link('transactions')} data-sveltekit-prefetch>
    <Button class="w-full" color="primary" outline>{$t('common.button.payment')}</Button>
  </a>
</div>
