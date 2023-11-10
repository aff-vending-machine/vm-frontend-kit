<!-- Action -->
<script lang="ts">
  import type { Machine } from '$lib/services/machine';

  export let source: Machine;
</script>

<!-- HTML -->
<div class="flex flex-col">
  <span>{source.name}</span>
  <span class="text-xs text-gray-500">{source.serial_number}</span>
</div>
