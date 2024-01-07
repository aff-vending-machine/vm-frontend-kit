<script>
  import { t } from '$lib/i18n/translations';
  import Icon from '@iconify/svelte';
</script>

<div class="flex h-64 w-full flex-col items-center justify-center space-y-4">
  <Icon icon="eos-icons:bubble-loading" class="h-12 w-12 text-primary-dark" />
  <span>{$t('common.loading')}</span>
</div>
