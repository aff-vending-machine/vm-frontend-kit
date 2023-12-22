<!-- Cart -->
<script lang="ts">
  import type { TransactionReport } from '$lib/types/report';

  export let index: number;
  export let source: TransactionReport;

  $: _ = index;
</script>

<!-- HTML -->
<div class="whitespace-nowrap">
  {#each source.cart as item}
    <span class="font-mono"
      >[{item.code} ({item.name}): {item.price} x {item.quantity} = {item.price * item.quantity}]</span
    >
    <br />
  {/each}
</div>

<!-- style -->
<style lang="scss">
</style>
