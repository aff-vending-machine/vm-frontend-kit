<script lang="ts">
  import Icon from '@iconify/svelte';

  import theme from '$lib/stores/theme';

  $: isLight = $theme === 'light';
</script>

<button class={$$props.class} on:click={theme.toggle}>
  <span class:hidden={!isLight}>
    <Icon icon="mdi:weather-sunny" class="h-8 w-8" />
  </span>
  <span class:hidden={isLight}>
    <Icon icon="mdi:weather-night" class="h-8 w-8" />
  </span>
</button>
