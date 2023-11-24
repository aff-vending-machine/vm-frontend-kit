<script lang="ts">
  import type { TransactionReport } from '$types/report';

  export let index: number;
  export let source: TransactionReport;

  $: _ = index;
</script>

<div class="whitespace-nowrap">
  <span>{source.machine_name}</span>
</div>
