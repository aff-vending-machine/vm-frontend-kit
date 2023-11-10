<script lang="ts">
  import Branch from './CardBranch.svelte';
  import Machine from './CardMachine.svelte';

  export let title: string;
</script>

<div class="flex flex-col border-b px-4 pb-8">
  <h2 class="my-4 text-lg font-semibold">{title}:</h2>
  <div class="grid grid-cols-2 flex-wrap gap-4 lg:grid-cols-3 xl:grid-cols-4">
    <slot {Branch} {Machine} />
  </div>
</div>
