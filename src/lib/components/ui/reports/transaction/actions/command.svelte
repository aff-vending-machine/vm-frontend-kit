<script lang="ts">
  import Icon from '@iconify/svelte';

  import { page } from '$app/stores';
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';

  let { onexport } = $props<{
    onexport: (ext: 'xlsx' | 'csv') => void;
  }>();

  function summary() {
    const params = new URLSearchParams($page.url.searchParams);
    params.delete('machine_id');
    params.delete('channel_id');
    params.sort();

    return `/portal/${$page.params.branch}/reports?${params.toString()}`;
  }

  function link() {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('group', 'true');
    params.delete('channel_id');
    params.sort();

    return `/portal/${$page.params.branch}/reports/stocks?${params.toString()}`;
  }

  function onExportExcelClick(e: MouseEvent) {
    e.preventDefault();
    onexport('xlsx');
  }

  function onExportCSVClick(e: MouseEvent) {
    e.preventDefault();
    onexport('csv');
  }
</script>

<div class="mb-2 flex flex-col space-y-4">
  <div class="flex space-x-2">
    <ButtonLink color="accent" class="w-32" href={summary()} outline>
      {$t('common.button.summary')}
    </ButtonLink>
    <ButtonLink color="accent" class="w-32" href={link()} outline>
      {$t('common.button.stock')}
    </ButtonLink>
  </div>
  <div class="flex space-x-2">
    <Button outline class="group w-32" onclick={onExportExcelClick}>
      <Icon icon="fa6-solid:file-excel" class="h-4 w-4 text-primary group-hover:text-white" />
      <span class="ml-2">{$t('common.button.export-excel')}</span>
    </Button>
    <Button outline class="group w-32" onclick={onExportCSVClick}>
      <Icon icon="fa6-solid:file-csv" class="h-4 w-4 text-primary group-hover:text-white" />
      <span class="ml-2">{$t('common.button.export-csv')}</span>
    </Button>
  </div>
</div>
