<script lang="ts">
  import { actions } from '../@actions';
  import Branch from './CardBranch.svelte';
  import Machine from './CardMachine.svelte';

  export let title: string;
  export let allSelects: string;
</script>

<div class="flex flex-col border-b px-4 pb-8">
  <h2 class="my-4 text-lg font-semibold">{title}:</h2>
  <div class="grid grid-cols-2 flex-wrap gap-4 lg:grid-cols-3 xl:grid-cols-4">
    <button
      class="w-full cursor-pointer rounded-lg border-2 border-gray-700 bg-white p-4 text-left shadow-sm shadow-gray-500 hover:shadow-xl"
      on:click={actions.selectAllBranches()}
    >
      <h4 class="text-lg">{allSelects}</h4>
    </button>
    <div class="col-span-1 lg:col-span-2 xl:col-span-3" />
    <slot {Branch} {Machine} />
  </div>
</div>
