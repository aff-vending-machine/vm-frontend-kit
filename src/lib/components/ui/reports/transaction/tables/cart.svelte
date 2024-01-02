<script lang="ts">
  import type { TransactionReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: TransactionReport;
  }>();
</script>

<div class="whitespace-nowrap">
  {#each source.cart as item}
    <span class="font-mono">
      [{item.code} ({item.name}): {item.price} x {item.quantity} = {item.price * item.quantity}]
    </span>
    <br />
  {/each}
</div>
