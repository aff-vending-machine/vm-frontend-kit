<script lang="ts">
  import type { StockReport } from '$lib/types/report';

  let { index } = $props<{
    index: number;
    source: StockReport;
  }>();
</script>

<div class="flex justify-center space-x-2">
  {index + 1}
</div>
