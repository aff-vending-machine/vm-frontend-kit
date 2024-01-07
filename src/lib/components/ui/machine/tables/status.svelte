<script lang="ts">
  import type { MachineEntity } from '$lib/types/machine';

  let { source } = $props<{
    index: number;
    source: MachineEntity;
  }>();
</script>

<div class="flex items-center justify-center">
  <span
    class="rounded-full px-3 py-2 text-center text-xs text-white"
    class:bg-success={source.status === 'online'}
    class:bg-warning={source.status === 'maintainance'}
    class:bg-neutral={source.status === 'offline'}
  >
    {source.status}
  </span>
</div>
