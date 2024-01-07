<script lang="ts">
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/home/Card.svelte';
  import Title from '$lib/components/ui/home/Title.svelte';
  import { t } from '$lib/i18n/translations';

  let { data } = $props();

  $effect(() => {
    if (data.options.branch.length === 1) {
      const branch = data.options.branch[0].value;
      goto(`/portal/${branch}/machines`);
    }
  });
</script>

<Title />
<div class="grid grid-cols-2 gap-8 p-8 md:grid-cols-4 xl:grid-cols-6">
  <Card label={$t('options.branch.all')} href="/portal/all/machines" />
  {#each data.options.branch || [] as branch}
    <Card label={branch.label} href="/portal/{branch.value}/machines" />
  {/each}
</div>
