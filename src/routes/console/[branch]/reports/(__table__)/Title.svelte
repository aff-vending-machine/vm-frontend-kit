<script lang="ts">
  import type { MachineReport } from '$types/report';

  export let source: MachineReport;
  export let index: number;

  $: _ = index;
</script>

<div class="flex flex-col">
  <span>{source.name}</span>
  <span class="text-sm">{source.serial_number}</span>
</div>
