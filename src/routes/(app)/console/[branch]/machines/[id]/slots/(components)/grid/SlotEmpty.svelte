<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let code: string;
  export let isExist: boolean;

  const dispatch = createEventDispatcher();
  const handleCreateEvent = () => !isExist && dispatch('create', { data: { code } });
</script>

<button
  class="bg-transaction flex h-48 w-40 flex-col items-center rounded-md border border-gray-300 p-2"
  on:click={handleCreateEvent}
>
  <div class="font-bold text-gray-300">{code}</div>
</button>
