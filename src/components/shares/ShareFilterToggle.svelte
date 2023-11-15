<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import ToggleField from '$components/forms/inputs/ToggleField.svelte';

  export let key: string;
  export let label: string;
  export let labelOn: string;
  export let labelOff: string;
  export let value: boolean;

  async function changeValue(event: Event) {
    const newValue = (event.target as HTMLInputElement).checked;
    const params = new URLSearchParams($page.url.searchParams);

    if (newValue === false) params.delete(key);
    else params.set(key, newValue + '');
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<ToggleField id={key} {label} {value} {labelOn} {labelOff} on:change={changeValue} />
