<script lang="ts">
  import type { TransactionReport } from '$lib/types/report';

  export let index: number;
  export let source: TransactionReport;

  $: _ = index;

  $: channel = source.payment_channel;
</script>

<div class="flex flex-col whitespace-nowrap">
  <span class="text-sm">{channel}</span>
  <span class="text-xs">
    [
    {#if channel == 'promptpay'}
      {source.reference2}
    {:else if channel == 'creditcard'}
      {source.reference3}
    {:else}
      {source.reference1}
    {/if}
    ]
  </span>
</div>
