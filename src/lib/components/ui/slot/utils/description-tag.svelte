<script lang="ts">
  import { t } from '$lib/i18n/translations';
</script>

<div class="flex space-x-2">
  <div class="w-28 rounded-sm bg-danger-lightest px-4 text-center">
    <span>{$t('slot.tag.disable')}</span>
  </div>
  <div class="w-28 rounded-sm bg-neutral-lightest px-4 text-center">
    <span>{$t('slot.tag.empty')}</span>
  </div>
  <div class="w-28 rounded-sm bg-warning-lightest px-4 text-center">
    <span>{$t('slot.tag.less-than-20')}</span>
  </div>
  <div class="w-28 rounded-sm bg-info-lightest px-4 text-center">
    <span>{$t('slot.tag.available')}</span>
  </div>
  <div class="w-28 rounded-sm bg-success-lightest px-4 text-center">
    <span>{$t('slot.tag.full')}</span>
  </div>
</div>
