<!-- DateTimePicker -->
<script lang="ts">
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { DatePicker } from 'date-picker-svelte';
  import TimePicker from './TimePicker.svelte';

  import { getLocaleDefaults } from 'date-picker-svelte/locale';
  import { locale, t } from '$lib/i18n/translations';
  import Icon from '@iconify/svelte';
  import Button from '$components/elements/buttons/Button.svelte';
  import { clickOutside } from '$lib/hooks/useClickOutside';

  export let value: Date;
  export let id: string;
  export let rangeFrom: Date;
  export let rangeTo: Date;

  const dispatch = createEventDispatcher();

  const selectedTab = writable<'calendar' | 'time'>('calendar');

  let showPicker = false;
  let dateValue = new Date(value);
  let timeValue = new Date(value);
  let storedValue = value;

  $: if (value !== storedValue) {
    dateValue = new Date(value);
    timeValue = new Date(value);
    storedValue = value;
  }

  const togglePicker = () => {
    showPicker = !showPicker;
  };

  function handleChange() {
    togglePicker();
    if (isNaN(dateValue.getDate())) {
      dateValue = value;
    }

    if (isNaN(timeValue.getTime())) {
      timeValue = value;
    }

    const mergedValue: Date = new Date(dateValue);
    mergedValue.setHours(timeValue.getHours());
    mergedValue.setMinutes(timeValue.getMinutes());
    mergedValue.setSeconds(timeValue.getSeconds());
    mergedValue.setMilliseconds(0);
    value = mergedValue;

    dispatch('change', { value });
  }

  function localeFromString(locale: string) {
    switch (locale) {
      case 'th-TH':
        return {
          weekdays: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
          months: [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม',
          ],
          weekStartsOn: 0,
        };
      default:
        return {
          ...getLocaleDefaults(),
          weekStartsOn: 0,
        };
    }
  }

  const handleClickOutside = () => (showPicker = false);
  $: localeTime = localeFromString($locale);
</script>

<div class="date-time-picker-{id} relative" use:clickOutside on:click-outside={handleClickOutside}>
  <button
    class="flex w-full cursor-pointer items-center rounded-md border border-gray-300 bg-white"
    on:click={togglePicker}
  >
    <input
      {id}
      class="box-shadow-none w-full border-0 bg-transparent px-2 py-1 text-sm text-gray-700 focus:border-none focus:outline-none"
      readonly
      type="text"
      value={dayjs(value).format('YYYY-MM-DD HH:mm')}
    />

    <div class="flex pr-2">
      <Icon icon="mdi:calendar" class="h-3 w-3 text-gray-700" />
    </div>
  </button>
  {#if showPicker}
    <div class="absolute left-0 z-50 mt-2 rounded-md border border-gray-200 bg-white shadow-lg">
      <div class="flex justify-center space-x-4 p-2">
        <button
          class="rounded-md px-4 py-2 transition-colors focus:outline-none {$selectedTab === 'calendar'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-gray-100'}"
          on:click={() => ($selectedTab = 'calendar')}
          class:selected={$selectedTab === 'calendar'}>{$t('common.button.date')}</button
        >
        <button
          class="rounded-md px-4 py-2 transition-colors focus:outline-none {$selectedTab === 'time'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-gray-100'}"
          on:click={() => ($selectedTab = 'time')}
          class:selected={$selectedTab === 'time'}>{$t('common.button.time')}</button
        >
      </div>

      <div class="shadow-md">
        {#if $selectedTab === 'calendar'}
          <DatePicker bind:value={dateValue} min={rangeFrom} max={rangeTo} locale={localeTime} />
        {:else}
          <TimePicker bind:value={timeValue} />
        {/if}
        <div>
          <Button on:click={handleChange} color="secondary" class="w-full rounded-none text-xl uppercase">
            {$t('common.button.done')}
          </Button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Add your custom styles here */
  .box-shadow-none:focus {
    box-shadow: none;
  }
</style>
