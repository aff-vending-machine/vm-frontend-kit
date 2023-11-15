<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let code: string;
  export let isExist: boolean;

  const dispatch = createEventDispatcher();
  const handleCreateEvent = () => !isExist && dispatch('create', { source: { code } });
</script>

<button
  class="bg-transaction flex h-36 w-32 flex-col items-center rounded-md border border-gray-300 p-2"
  on:click={handleCreateEvent}
>
  <div class="font-bold text-gray-300">{code}</div>
</button>
