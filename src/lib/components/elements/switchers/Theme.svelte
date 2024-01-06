<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { theme } from '$lib/state.svelte';
  import Icon from '@iconify/svelte';

  let { class: className } = $props<{
    class?: string;
  }>();

  const isLight = $derived(theme.value === 'light');

  function onToggle(e: MouseEvent) {
    e.preventDefault();

    if (theme.value === 'light') {
      theme.value = 'dark';
    } else {
      theme.value = 'light';
    }
    invalidateAll();
  }
</script>

<button class={className} onclick={onToggle}>
  <span class:hidden={!isLight}>
    <Icon icon="mdi:weather-sunny" class="h-8 w-8" />
  </span>
  <span class:hidden={isLight}>
    <Icon icon="mdi:weather-night" class="h-8 w-8" />
  </span>
</button>
