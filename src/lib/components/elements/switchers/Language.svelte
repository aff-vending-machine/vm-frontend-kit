<script lang="ts">
  import Icon from '@iconify/svelte';

  import language from '$lib/stores/language';

  $: isUS = $language === 'en';
</script>

<button class={$$props.class} on:click={language.toggle}>
  <span class:hidden={!isUS}>
    <Icon icon="emojione:flag-for-us-outlying-islands" class="h-8 w-8" />
  </span>
  <span class:hidden={isUS}>
    <Icon icon="emojione:flag-for-thailand" class="h-8 w-8" />
  </span>
</button>
