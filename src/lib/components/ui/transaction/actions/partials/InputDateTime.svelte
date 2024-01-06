<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import dayjs from 'dayjs';

  let {
    key,
    label,
    min: minDate = dayjs('2023/01/01T00:00:00').toDate(),
    max: maxDate = dayjs().set('hour', 23).set('minute', 59).set('second', 59).toDate(),
    value: valueDate,
  } = $props<{
    key: string;
    label: string;
    min?: Date;
    max?: Date;
    value: Date;
  }>();

  const min = $derived(dayjs(minDate).format('YYYY-MM-DDTHH:mm'));
  const max = $derived(dayjs(maxDate).format('YYYY-MM-DDTHH:mm'));
  const value = $derived(dayjs(valueDate).format('YYYY-MM-DDTHH:mm'));

  async function onchange(event: Event) {
    const newValue = (event.target as HTMLSelectElement).value;
    const params = new URLSearchParams($page.url.searchParams);

    if (newValue === '0' || newValue === '') params.delete(key);
    else params.set(key, dayjs(newValue).toISOString());
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<div>
  <label for={key} class="mb-1 block text-sm font-medium">{label}:</label>
  <input
    id={key}
    name={key}
    class="m-0 rounded-sm border-neutral p-1 text-sm text-neutral"
    type="datetime-local"
    {min}
    {max}
    {value}
    {onchange}
  />
</div>

<style lang="scss">
  input[type='datetime-local']:disabled {
    color: white;
  }
</style>
