<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';

  import ShareFilterDateTime from '$lib/components/shares/ShareFilterDateTime.svelte';
  import ShareFilterSelection from '$lib/components/shares/ShareFilterSelection.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import 'dayjs/locale/th';
  import ToggleField from '$lib/components/forms/inputs/ToggleField.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  let { from, to, group, machineID, machineOptions } = $props<{
    from: Date;
    to: Date;
    group: boolean;
    machineID: number;
    machineOptions: SelectOptionsType[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
  <ShareFilterSelection
    key="machine_id"
    label={$t('common.field.machine')}
    value={machineID}
    options={machineOptions}
  />

  <ShareFilterDateTime key="from" label={$t('common.field.start-date')} value={from} />

  <ShareFilterDateTime key="to" label={$t('common.field.end-date')} value={to} />

  <ToggleField
    id="group"
    label={$t('common.field.group-product')}
    labelOn={$t('common.field.group-product-on')}
    labelOff={$t('common.field.group-product-off')}
    bind:value={group}
  />
</div>
