<script lang="ts">
  import type { MachineEntity } from '$lib/types/machine';

  let { source } = $props<{
    index: number;
    source: MachineEntity;
  }>();
</script>

<div class="flex items-center justify-center">
  <span class="rounded-full px-3 py-2 text-center text-xs text-neutral-dark">
    {source.temperature ?? '-'} °C
  </span>
</div>
