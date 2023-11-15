<script lang="ts">
  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import Icon from '@iconify/svelte';
</script>

<div class="flex justify-end">
  <Button outline class="group">
    <Icon icon="mdi:export" class="h-4 w-4 text-primary-500 group-hover:text-white" />
    <span class="ml-2">{$t('common.button.export')}</span>
  </Button>
</div>
