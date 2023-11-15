<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import ShareFilterDateTime from '$components/shares/ShareFilterDateTime.svelte';

  import 'dayjs/locale/th';
  import ToggleField from '$components/forms/inputs/ToggleField.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import type { SelectOptionsType } from '$lib/utils/options';

  export let from: Date;
  export let to: Date;
  export let group: boolean;
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
  <ToggleField
    id="toggle-group"
    label={$t('common.field.group-product')}
    labelOn={$t('common.field.group-product-on')}
    labelOff={$t('common.field.group-product-off')}
    bind:value={group}
  />
</div>
