<script lang="ts">
  import Icon from '@iconify/svelte';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import overlay from '$lib/stores/overlay';
</script>

<div class="flex justify-end">
  <Button outline class="group" on:click={overlay.open}>
    <Icon icon="mdi:plus" class="h-4 w-4 text-primary-500 group-hover:text-white" />
    <span class="ml-2">{$t('common.button.add-product-group')}</span>
  </Button>
</div>
