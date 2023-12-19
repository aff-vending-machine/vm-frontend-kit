<!-- Command -->
<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';
  import { createEventDispatcher } from 'svelte';

  import 'dayjs/locale/th';

  import Button from '$components/elements/buttons/Button.svelte';
  import { locale, t } from '$lib/i18n/translations';

  export let time: Date | undefined;
  export let syncing: boolean;
  export let editing: boolean;
  export let loading: boolean;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  // events
  const dispatch = createEventDispatcher();
  const handleRefresh = () => dispatch('refresh');
  const handleSave = () => dispatch('save');
  const handleCancel = () => dispatch('reset');

  // helpers
  const showTime = (date?: Date) => {
    if (!date) return $t('common.field.never');
    return dayjs(date).locale($locale.split('-')[0]).fromNow();
  };
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <div class="block space-x-2">
    <Button i="sync" disabled={!syncing} {loading} on:click={handleRefresh}>{$t('common.button.refresh')}</Button>
    <Button i="save" disabled={!editing} {loading} on:click={handleSave}>{$t('common.button.save')}</Button>
    <Button i="cancel" disabled={!editing} {loading} on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
  <span class="text-xs">{$t('common.field.last-time-sync')}: {showTime(time)}</span>
</div>
