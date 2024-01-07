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
  import SelectIDFilter from '$lib/components/ui-common/filters/SelectIDFilter.svelte';
  import ToggleField from '$lib/components/ui-common/forms/ToggleField.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  let { from, to, group, machineID, machineOptions, onchange } = $props<{
    from: Date;
    to: Date;
    group: boolean;
    machineID: number;
    machineOptions: SelectOptionsType<number>[];
    onchange?: (checked: boolean) => void;
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
  <SelectIDFilter
    key="machine_id"
    label={$t('common.field.machine')}
    value={machineID}
    options={machineOptions}
    unselected={0}
    placeholder="All"
  />

  <DateTimeFilter key="from" label={$t('common.field.start-date')} max={to} value={from} />

  <DateTimeFilter key="to" label={$t('common.field.end-date')} min={from} value={to} />

  <ToggleField
    id="group"
    label={$t('common.field.group-product')}
    labelOn={$t('common.field.group-product-on')}
    labelOff={$t('common.field.group-product-off')}
    bind:value={group}
    {onchange}
  />
</div>
