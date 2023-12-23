<!-- Command -->
<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { locale, t } from '$lib/i18n/translations';

  import 'dayjs/locale/th';
  import Icon from '@iconify/svelte';
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  let { time, syncing, editing, loading, onrefresh, onsave, oncancel } = $props<{
    time: Date | undefined;
    syncing: boolean;
    editing: boolean;
    loading: boolean;
    onrefresh?: () => void;
    onsave?: () => void;
    oncancel?: () => void;
  }>();
  let showTime = $derived(!time ? $t('common.field.never') : dayjs(time).locale($locale.split('-')[0]).fromNow());

  function handleRefresh(e: MouseEvent) {
    e.preventDefault();
    onrefresh && onrefresh();
  }

  function handleSave(e: MouseEvent) {
    e.preventDefault();
    onsave && onsave();
  }

  function handleCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel && oncancel();
  }
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <div class="block space-x-2">
    <Button disabled={!syncing} {loading} onclick={handleRefresh}>
      <Icon icon="mdi:sync" class="mr-1 h-4 w-4" />
      {$t('common.button.refresh')}
    </Button>
    <Button disabled={!editing} {loading} onclick={handleSave}>
      <Icon icon="mdi:content-save" class="mr-1 h-4 w-4" />
      {$t('common.button.save')}
    </Button>
    <Button disabled={!editing} {loading} onclick={handleCancel}>
      <Icon icon="mdi:history" class="mr-1 h-4 w-4" />
      {$t('common.button.reset')}
    </Button>
  </div>
  <span class="text-xs">{$t('common.field.last-time-sync')}: {showTime}</span>
</div>
