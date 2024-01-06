<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import dayjs from 'dayjs';
  import DateTimeField from '../forms/DateTimeField.svelte';

  let { key, ...restProps } = $props<{
    key: string;
    label: string;
    min?: Date;
    max?: Date;
    value: Date;
  }>();

  async function onchange(value: string) {
    const params = new URLSearchParams($page.url.searchParams);

    if (value === '0' || value === '') params.delete(key);
    else params.set(key, dayjs(value).toISOString());
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<DateTimeField id={key} {...restProps} {onchange} />
