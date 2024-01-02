<script lang="ts">
  import Icon from '@iconify/svelte';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';

  let { onsync } = $props<{
    onsync: () => void;
  }>();

  function onSync(e: MouseEvent) {
    e.preventDefault();
    onsync();
  }
</script>

<div class="flex justify-end">
  <Button outline class="group" onclick={onSync}>
    <Icon icon="mdi:plus" class="h-4 w-4 text-primary group-hover:text-white" />
    <span class="ml-2">{$t('common.button.add-transaction')}</span>
  </Button>
</div>
