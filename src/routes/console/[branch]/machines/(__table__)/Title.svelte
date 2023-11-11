<script lang="ts">
  import type { Machine } from '$lib/services/machine';

  export let source: Machine;
</script>

<div class="flex flex-col">
  <span class="text-lg">{source.name}</span>
  <span class="text-xs">{source.location}</span>
</div>
