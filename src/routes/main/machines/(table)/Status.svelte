<!-- Status -->
<script lang="ts">
  import type { Machine } from '$lib/services/machine';

  export let source: Machine;
</script>

<!-- HTML -->
<div class="flex space-x-4">
  <span class="rounded-full bg-gray-500 px-3 py-1 text-white" class:bg-green-500={source.status === 'enable'}
    >{source.status}</span
  >
</div>
