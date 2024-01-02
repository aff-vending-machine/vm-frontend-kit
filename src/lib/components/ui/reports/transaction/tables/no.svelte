<script lang="ts">
  import type { TransactionReport } from '$lib/types/report';

  let { index } = $props<{
    index: number;
    source: TransactionReport;
  }>();
</script>

<div class="flex justify-center space-x-2">
  {index + 1}
</div>
