<script lang="ts">
  import Icon from '@iconify/svelte';

  import { page } from '$app/stores';
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';

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
</script>

<div class="mb-2 flex flex-col justify-end space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ButtonLink color="accent" href={summary()} outline>
    {$t('common.button.summary')}
  </ButtonLink>
  <ButtonLink color="accent" href={link()} outline>
    {$t('common.button.stock')}
  </ButtonLink>
  <Button outline class="group">
    <Icon icon="mdi:export" class="h-4 w-4 text-primary group-hover:text-white" />
    <span class="ml-2">{$t('common.button.export')}</span>
  </Button>
</div>
