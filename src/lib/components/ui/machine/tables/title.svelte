<script lang="ts">
  import type { MachineEntity } from '$lib/types/machine';

  let { source } = $props<{
    index: number;
    source: MachineEntity;
  }>();
</script>

<div class="flex flex-col">
  <span class="text-lg">{source.name}</span>
  <span class="text-xs">{source.serial_number}</span>
</div>
