<script lang="ts">
  import { locale, t } from '$lib/i18n/translations';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import ShareFilterDateTime from '$components/shares/ShareFilterDateTime.svelte';

  import 'dayjs/locale/th';

  export let from: string;
  export let to: string;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  const today = dayjs(new Date());

  if (from === '')
    from = today
      .set('millisecond', 0)
      .set('second', 0)
      .set('minute', 0)
      .set('hour', 21)
      .subtract(1, 'day')
      .toISOString();
  if (to === '') to = today.set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21).toISOString();

  $: startDateTime = dayjs(from).toDate();
  $: endDateTime = dayjs(to).toDate();
  $: localeTime = $locale.split('-')[0];
</script>

<div class="mb-2 flex flex-col sm:space-x-2 md:flex-row">
  <ShareFilterDateTime key="from" label={$t('common.field.start-date')} bind:value={startDateTime} />
  <ShareFilterDateTime key="to" label={$t('common.field.end-date')} bind:value={endDateTime} />
</div>
<div class="flex justify-end">
  <sub class="text-xs">
    *{$t('common.field.report_from')}
    <span class="text-secondary-700">{dayjs(startDateTime).locale(localeTime).format('LLLL')}</span>
    {$t('common.field.report_to')}
    <span class="text-secondary-700">{dayjs(endDateTime).locale(localeTime).format('LLLL')}</span>
    ({dayjs(startDateTime).locale(localeTime).from(dayjs(endDateTime), true)})
  </sub>
</div>
