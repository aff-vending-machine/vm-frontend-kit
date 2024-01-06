<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';

  import { locale, t } from '$lib/i18n/translations';
  import 'dayjs/locale/th';
  import DateTimeFilter from '$lib/components/ui-common/filters/DateTimeFilter.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  let { from, to } = $props<{
    from: Date;
    to: Date;
  }>();
  const localeTime = $derived($locale.split('-')[0] ?? 'th');
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <DateTimeFilter key="from" label={$t('common.field.start-date')} max={to} value={from} />

  <DateTimeFilter key="to" label={$t('common.field.end-date')} min={from} value={to} />
</div>
<div class="flex justify-end">
  <sub class="text-xs">
    *{$t('common.field.report_from')}
    <span class="text-secondary-dark">{dayjs(from).locale(localeTime).format('LLLL')}</span>
    {$t('common.field.report_to')}
    <span class="text-secondary-dark">{dayjs(to).locale(localeTime).format('LLLL')}</span>
    ({dayjs(from).locale(localeTime).from(dayjs(to), true)})
  </sub>
</div>
