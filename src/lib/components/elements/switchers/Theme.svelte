<script lang="ts">
  import Icon from '@iconify/svelte';

  import theme from '$lib/stores/theme';

  let { class: className } = $props<{
    class?: string;
  }>();

  const isLight = $derived($theme === 'light');
</script>

<button class={className} on:click={theme.toggle}>
  <span class:hidden={!isLight}>
    <Icon icon="mdi:weather-sunny" class="h-8 w-8" />
  </span>
  <span class:hidden={isLight}>
    <Icon icon="mdi:weather-night" class="h-8 w-8" />
  </span>
</button>
