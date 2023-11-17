<script lang="ts">
  import dayjs from 'dayjs';
  import timezone from 'dayjs/plugin/timezone';
  import utc from 'dayjs/plugin/utc';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import Button from '$components/elements/buttons/Button.svelte';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import TextInputField from '$components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import overlay from '$lib/stores/overlay';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');

  export let name: string;
  export let report: string;
  export let group: boolean = false;
  export let from: Date;
  export let to: Date;

  const dispatch = createEventDispatcher();

  const from_ = dayjs(from).format('YYMMDD_HHmm');
  const to_ = dayjs(to).format('YYMMDD_HHmm');

  const formID = 'filename-form';
  const filename = field('filename', `${name}-${report}-${from_}-${to_}${group ? '-group' : ''}`, [required()]);
  const application = field('application', 'xlsx', [required()]);
  const filenameForm = form(filename, application);

  const applicationOptions = [
    { label: $t('options.export.excel'), value: 'xlsx' },
    { label: $t('options.export.csv'), value: 'csv' },
  ];

  async function handleSubmit() {
    await filenameForm.validate();
    if ($filenameForm.valid) {
      dispatch('download', filenameForm.summary());
    }
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('report.export')}: {$t('report.export-stock')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <TextInputField
      id="filename"
      label={$t('report.filename')}
      bind:value={$filename.value}
      error={$filename.errors?.at(0)}
    />
    <SelectField
      id="application"
      label={$t('report.application')}
      bind:value={$application.value}
      error={$application.errors?.at(0)}
      options={applicationOptions}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={formID}>{$t('common.button.export')}</Button>
    <Button color="warning" outline on:click={overlay.close}>{$t('common.button.cancel')}</Button>
  </div>
</div>
