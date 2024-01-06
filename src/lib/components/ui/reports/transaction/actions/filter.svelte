<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';

  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import 'dayjs/locale/th';
  import DateTimeFilter from '$lib/components/ui-common/filters/DateTimeFilter.svelte';
  import SelectFilter from '$lib/components/ui-common/filters/SelectFilter.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  let { from, to, channelID, channelOptions, machineID, machineOptions } = $props<{
    from: Date;
    to: Date;
    channelID: number;
    channelOptions: SelectOptionsType[];
    machineID: number;
    machineOptions: SelectOptionsType[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <SelectFilter
    key="machine_id"
    label={$t('common.field.machine')}
    value={machineID}
    options={machineOptions}
    unselected={0}
    placeholder="All"
  />

  <DateTimeFilter key="from" label={$t('common.field.start-date')} max={to} value={from} />

  <DateTimeFilter key="to" label={$t('common.field.end-date')} min={from} value={to} />

  <SelectFilter
    key="channel_id"
    label={$t('common.field.payment-channel')}
    value={channelID}
    options={channelOptions}
    unselected={0}
    placeholder="All Payments"
  />
</div>
