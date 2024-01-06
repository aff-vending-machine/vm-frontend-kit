<script lang="ts">
  import { viewOptions, type SelectOptionsType, orderStatusOptions } from '$lib/utils/options';
  import DateTimeFilter from '$lib/components/ui-common/filters/DateTimeFilter.svelte';
  import type { MachineEntity } from '$lib/types/machine';
  import type { PaymentChannelEntity } from '$lib/types/payment_channel';
  import { t } from '$lib/i18n/translations';
  import ShareFilterToggle from '$lib/components/shares/ShareFilterToggle.svelte';
  import SelectFilter from '$lib/components/ui-common/filters/SelectFilter.svelte';

  let { perPage, startDate, endDate, machineID, channelID, status, error, machineOptions, channelOptions } = $props<{
    perPage: number;
    startDate: Date;
    endDate: Date;
    machineID: number;
    channelID: number;
    status: string;
    error: boolean;
    machineOptions: SelectOptionsType<number, MachineEntity>[];
    channelOptions: SelectOptionsType<number, PaymentChannelEntity>[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <SelectFilter key="per_page" label="View" options={viewOptions} value={perPage} />

  <DateTimeFilter key="start_date" label={$t('common.field.start-date')} max={endDate} value={startDate} />

  <DateTimeFilter key="end_date" label={$t('common.field.start-date')} min={startDate} value={endDate} />

  <SelectFilter
    key="machine_id"
    label="Machine"
    options={machineOptions}
    value={machineID}
    unselected={0}
    placeholder="all"
  />

  <SelectFilter
    key="channel_id"
    label="Channel"
    options={channelOptions}
    value={channelID}
    unselected={0}
    placeholder="all"
  />

  <SelectFilter key="order_status" label="Status" options={orderStatusOptions($t)} value={status} />

  <ShareFilterToggle key="is_error" label="Error" value={error} labelOn="Yes" labelOff="No" />
</div>
