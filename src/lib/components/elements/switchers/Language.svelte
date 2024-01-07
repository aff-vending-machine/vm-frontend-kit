<script lang="ts">
  import { page } from '$app/stores';
  import { loadTranslations } from '$lib/i18n/translations';
  import { language } from '$lib/state.svelte';
  import Icon from '@iconify/svelte';

  let { class: className } = $props<{
    class?: string;
  }>();

  const isUS = $derived(language.value !== 'th');

  async function onToggle(e: MouseEvent) {
    e.preventDefault();

    if (language.value === 'en') {
      language.value = 'th';
    } else {
      language.value = 'en';
    }
    await loadTranslations(language.value ?? 'en', $page.url.pathname);
  }
</script>

<button class={className} onclick={onToggle}>
  <span class:hidden={!isUS}>
    <Icon icon="emojione:flag-for-us-outlying-islands" class="h-8 w-8" />
  </span>
  <span class:hidden={isUS}>
    <Icon icon="emojione:flag-for-thailand" class="h-8 w-8" />
  </span>
</button>
