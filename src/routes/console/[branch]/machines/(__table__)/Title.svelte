<script lang="ts">
  import type { Machine } from '$types/machine';

  export let source: Machine;
</script>

<div class="flex flex-col">
  <span class="text-lg">{source.name}</span>
  <span class="text-xs">{source.serial_number}</span>
</div>
