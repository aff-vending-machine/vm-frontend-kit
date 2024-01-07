<script lang="ts">
  import { page } from '$app/stores';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: MachineReport;
  }>();

  function link(type: string) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('machine_id', source.id.toString());
    if (type === 'stocks') params.set('group', 'true');
    params.sort();

    return `/portal/${$page.params.branch}/reports/${type}?${params.toString()}`;
  }
</script>

<div class="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ButtonLink class="w-full" href={link('stocks')} color="accent" outline>
    {$t('common.button.stock')}
  </ButtonLink>
  <ButtonLink class="w-full" href={link('transactions')} color="secondary" outline>
    {$t('common.button.payment')}
  </ButtonLink>
</div>
