<script lang="ts">
  import language from '$lib/stores/language';
  import Icon from '@iconify/svelte';

  $: isUS = $language === 'en';
</script>

<button class="cursor-pointer" on:click={language.toggle}>
  <span class:hidden={!isUS}>
    <Icon icon="emojione:flag-for-us-outlying-islands" class="h-8 w-8" />
  </span>
  <span class:hidden={isUS}>
    <Icon icon="emojione:flag-for-thailand" class="h-8 w-8" />
  </span>
</button>
