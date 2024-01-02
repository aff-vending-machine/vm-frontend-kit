<script lang="ts">
  import type { MachineReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: MachineReport;
  }>();
</script>

<div class="flex flex-col">
  <span>{source.name}</span>
  <span class="text-sm">{source.serial_number}</span>
</div>
