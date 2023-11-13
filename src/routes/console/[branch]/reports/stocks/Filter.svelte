<script lang="ts">
  import { locale, t } from '$lib/i18n/translations';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import ShareFilterDateTime from '$components/shares/ShareFilterDateTime.svelte';

  import 'dayjs/locale/th';
  import ToggleField from '$components/forms/inputs/ToggleField.svelte';

  export let from: Date;
  export let to: Date;
  export let group: boolean;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  $: localeTime = $locale.split('-')[0];
</script>

<div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <ShareFilterDateTime key="from" label={$t('common.field.start-date')} value={from} />
  <ShareFilterDateTime key="to" label={$t('common.field.end-date')} value={to} />
  <ToggleField
    id="toggle-group"
    label={$t('common.field.group-product')}
    labelOn={$t('common.field.group-product-on')}
    labelOff={$t('common.field.group-product-off')}
    bind:value={group}
  />
</div>
<div class="flex justify-end">
  <sub class="text-xs">
    *{$t('common.field.report_from')}
    <span class="text-secondary-700">{dayjs(from).locale(localeTime).format('LLLL')}</span>
    {$t('common.field.report_to')}
    <span class="text-secondary-700">{dayjs(to).locale(localeTime).format('LLLL')}</span>
    ({dayjs(from).locale(localeTime).from(dayjs(to), true)})
  </sub>
</div>
