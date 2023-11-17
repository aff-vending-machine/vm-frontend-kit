<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';

  import ShareFilterDateTime from '$components/shares/ShareFilterDateTime.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import 'dayjs/locale/th';

  export let from: Date;
  export let to: Date;
  export let channelId: number;
  export let channelOptions: SelectOptionsType[];
  export let machineId: number;
  export let machineOptions: SelectOptionsType[];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterSelection
    key="machine_id"
    label={$t('common.field.machine')}
    value={machineId}
    options={machineOptions}
  />
  <ShareFilterDateTime key="from" label={$t('common.field.start-date')} value={from} />
  <ShareFilterDateTime key="to" label={$t('common.field.end-date')} value={to} />
  <ShareFilterSelection
    key="channel_id"
    label={$t('common.field.payment-channel')}
    value={channelId}
    options={channelOptions}
    unselected={0}
    placeholder="All Payments"
  />
</div>
