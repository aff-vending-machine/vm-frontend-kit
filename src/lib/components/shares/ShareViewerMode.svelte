<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ViewerMode from '../elements/switchers/Switch.svelte';

  let { key, label, value } = $props<{
    key: string;
    label: string;
    value: boolean;
  }>();

  async function onchange(e: Event) {
    const newValue = (e.target as HTMLInputElement).checked;
    const params = new URLSearchParams($page.url.searchParams);

    if (newValue === false) params.delete(key);
    else params.set(key, newValue + '');
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<ViewerMode id={key} {label} {value} {onchange} />
