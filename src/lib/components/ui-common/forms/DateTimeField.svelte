<script lang="ts">
  import dayjs from 'dayjs';

  let {
    id,
    label,
    min: minDate = dayjs('2023/01/01T00:00:00').toDate(),
    max: maxDate = dayjs().set('hour', 23).set('minute', 59).set('second', 59).toDate(),
    value: valueDate,
    onchange,
  } = $props<{
    id: string;
    label: string;
    min?: Date;
    max?: Date;
    value: Date;
    onchange: (value: string) => void;
  }>();

  const min = $derived(dayjs(minDate).format('YYYY-MM-DDTHH:mm'));
  const max = $derived(dayjs(maxDate).format('YYYY-MM-DDTHH:mm'));
  const value = $derived(dayjs(valueDate).format('YYYY-MM-DDTHH:mm'));

  async function onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    valueDate = new Date(newValue);
    onchange && onchange(newValue);
  }
</script>

<div>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <input
    {id}
    name={id}
    class="m-0 rounded-sm border-neutral p-1 text-sm text-neutral"
    type="datetime-local"
    {min}
    {max}
    {value}
    onchange={onChange}
  />
</div>
