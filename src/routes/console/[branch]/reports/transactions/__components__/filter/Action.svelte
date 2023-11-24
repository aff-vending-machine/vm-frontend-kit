<script lang="ts">
  import Icon from '@iconify/svelte';

  import { page } from '$app/stores';
  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import overlay from '$lib/stores/overlay';

  $: link = () => {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('group', 'true');
    params.delete('channel_id');
    params.sort();

    return `/console/${$page.params.branch}/reports/stocks?${params.toString()}`;
  };
</script>

<div class="mb-2 flex flex-col justify-end space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <a href={link()} data-sveltekit-prefetch>
    <Button class="w-full" color="primary" outline>{$t('common.button.stock')}</Button>
  </a>
  <Button outline class="group" on:click={overlay.open}>
    <Icon icon="mdi:export" class="h-4 w-4 text-primary-500 group-hover:text-white" />
    <span class="ml-2">{$t('common.button.export')}</span>
  </Button>
</div>
