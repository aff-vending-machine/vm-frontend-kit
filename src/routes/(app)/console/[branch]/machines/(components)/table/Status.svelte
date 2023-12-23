<script lang="ts">
  import type { Machine } from '$lib/types/machine';

  let { source } = $props<{
    index: number;
    source: Machine;
  }>();
</script>

<span
  class="w-full rounded-full px-3 py-2 text-center text-xs text-white"
  class:bg-green-500={source.status === 'online'}
  class:bg-blue-500={source.status === 'maintainance'}
  class:bg-gray-500={source.status === 'offline'}
>
  {source.status}
</span>
