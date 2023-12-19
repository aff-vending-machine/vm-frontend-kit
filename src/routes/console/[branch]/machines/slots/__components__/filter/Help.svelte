<script lang="ts">
  import { t } from '$lib/i18n/translations';
</script>

<div class="flex space-x-2">
  <div class="w-28 rounded-sm bg-red-100 px-4 text-center">
    <span>{$t('slot.tag.disable')}</span>
  </div>
  <div class="w-28 rounded-sm bg-gray-100 px-4 text-center">
    <span>{$t('slot.tag.empty')}</span>
  </div>
  <div class="w-28 rounded-sm bg-yellow-100 px-4 text-center">
    <span>{$t('slot.tag.less-than-20')}</span>
  </div>
  <div class="w-28 rounded-sm bg-blue-100 px-4 text-center">
    <span>{$t('slot.tag.available')}</span>
  </div>
  <div class="w-28 rounded-sm bg-green-100 px-4 text-center">
    <span>{$t('slot.tag.full')}</span>
  </div>
</div>
