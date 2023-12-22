<script lang="ts">
  import dayjs from 'dayjs';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import DateTimeField from '$lib/components/forms/inputs/DateTimeField.svelte';

  export let key: string;
  export let label: string;
  export let value: Date;
  export let error: string | null = null;

  async function changeValue(event: CustomEvent) {
    const newValue = dayjs(event.detail.value).toISOString();
    const params = new URLSearchParams($page.url.searchParams);

    if (newValue === '0') params.delete(key);
    else params.set(key, newValue);
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }

  $: rangeFrom = dayjs().set('year', 2023).startOf('year').toDate();
  $: rangeTo = dayjs().set('minute', 0).set('hour', 21).toDate();
</script>

<DateTimeField id={key} {label} {value} {rangeFrom} {rangeTo} {error} on:change={changeValue} />
