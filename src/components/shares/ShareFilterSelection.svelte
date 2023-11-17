<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import type { SelectOptionsType } from '$lib/utils/options';

  export let key: string;
  export let label: string;
  export let options: SelectOptionsType[];
  export let value: number;
  export let unselected: number | undefined = undefined;
  export let placeholder: string | undefined = undefined;

  async function changeValue(event: Event) {
    const newValue = (event.target as HTMLSelectElement).value;
    const params = new URLSearchParams($page.url.searchParams);

    if (newValue === '0') params.delete(key);
    else params.set(key, newValue);
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<SelectField id={key} {label} {value} {options} {unselected} {placeholder} on:change={changeValue} />
