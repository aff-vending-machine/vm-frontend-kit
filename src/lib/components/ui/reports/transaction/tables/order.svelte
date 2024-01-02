<script lang="ts">
  import type { TransactionReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: TransactionReport;
  }>();
</script>

<div class="whitespace-nowrap">
  <span>{source.machine_name}</span>
</div>
