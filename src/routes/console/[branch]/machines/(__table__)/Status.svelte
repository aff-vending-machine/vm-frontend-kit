<script lang="ts">
  import type { Machine } from '$types/machine';

  export let source: Machine;
</script>

<span
  class="rounded-full px-3 py-2 text-xs text-white"
  class:bg-secondary-500={source.status === 'enable'}
  class:bg-gray-500={source.status !== 'enable'}
>
  {source.status}
</span>
