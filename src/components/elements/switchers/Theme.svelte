<script lang="ts">
  import theme from '$lib/stores/theme';
  import Icon from '@iconify/svelte';

  $: isLight = $theme === 'light';
</script>

<button class="cursor-pointer" on:click={theme.toggle}>
  <span class:hidden={!isLight}>
    <Icon icon="mdi:weather-sunny" class="h-8 w-8" />
  </span>
  <span class:hidden={isLight}>
    <Icon icon="mdi:weather-night" class="h-8 w-8" />
  </span>
</button>
