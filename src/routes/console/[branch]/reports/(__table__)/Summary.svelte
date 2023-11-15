<script lang="ts">
  import Currency from '$components/elements/labels/Currency.svelte';
  import type { MachineReport } from '$types/report';

  export let source: MachineReport;
  export let index: number;

  $: _ = index;
</script>

<div class="flex flex-col">
  <span class="mb-1 font-semibold sm:hidden">{source.name}</span>
  <span class="text-xs"
    ><span class="sm:hidden">CC</span><span class="hidden sm:inline-block">Credit Card</span>
    <Currency amount={source.total_payments['creditcard']} /></span
  >
  <span class="text-xs"
    ><span class="sm:hidden">PP</span><span class="hidden sm:inline-block">Promptpay</span>
    <Currency amount={source.total_payments['promptpay']} /></span
  >
  <span class="mt-1 text-sm font-semibold">Summary <Currency amount={source.total} /></span>
</div>
