<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { SelectOptionsType } from '$lib/utils/options';
  import SelectField from '../forms/SelectField.svelte';

  let { key, ...restProps } = $props<{
    key: string;
    value: unknown;
    options: SelectOptionsType[];
    label?: string | null;
    error?: string | null;
    placeholder?: string;
    unselected?: unknown;
    disabled?: boolean;
    hidden?: boolean;
    onchange?: (e: Event) => void;
  }>();

  async function onchange(value: string) {
    const params = new URLSearchParams($page.url.searchParams);

    if (value === '0' || value === '') params.delete(key);
    else params.set(key, value);
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<SelectField id={key} {...restProps} {onchange} />
