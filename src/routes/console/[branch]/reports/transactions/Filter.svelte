<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import ShareFilterDateTime from '$components/shares/ShareFilterDateTime.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';

  import 'dayjs/locale/th';
  import type { SelectOptionsType } from '$lib/utils/options';

  export let from: Date;
  export let to: Date;
  export let channel_id: number;
  export let channelOptions: SelectOptionsType[];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterDateTime key="from" label={$t('common.field.start-date')} value={from} />
  <ShareFilterDateTime key="to" label={$t('common.field.end-date')} value={to} />
  <ShareFilterSelection
    key="channel_id"
    label={$t('common.field.group-product')}
    value={channel_id}
    options={channelOptions}
    unselected={0}
    placeholder="All Payments"
  />
</div>
