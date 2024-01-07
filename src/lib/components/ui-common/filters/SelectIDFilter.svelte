<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { SelectOptionsType } from '$lib/utils/options';
  import SelectIDField from '../forms/SelectIDField.svelte';

  let { key, ...restProps } = $props<{
    key: string;
    value: number;
    options: SelectOptionsType<number>[];
    label?: string | null;
    error?: string | null;
    placeholder?: string;
    unselected?: number;
    disabled?: boolean;
    hidden?: boolean;
    onchange?: (e: Event) => void;
  }>();

  async function onchange(value: number) {
    const params = new URLSearchParams($page.url.searchParams);

    if (value === 0) params.delete(key);
    else params.set(key, value.toString());
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<SelectIDField id={key} {...restProps} {onchange} />
