<script lang="ts">
  import { t } from '$lib/translations';
  import Card from './(components)/Card.svelte';
  export let data;
</script>

<div class="flex flex-col space-y-4 rounded-lg bg-white">
  {#await data}
    <div>{$t('common.loading')}</div>
  {:then { branches, machines }}
    <Card let:Branch title={$t('console.select-a-branch')}>
      <Branch {branches} {machines} />
    </Card>
    <Card let:Machine title={$t('console.select-a-machine')}>
      <Machine {branches} {machines} />
    </Card>
  {/await}
</div>
