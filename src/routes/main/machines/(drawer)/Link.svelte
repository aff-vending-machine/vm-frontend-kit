<!-- Commands -->
<script lang="ts">
  import type { Machine } from '$lib/services/machine';

  export let machine: Machine;
</script>

<div class="flex flex-col border-b border-gray-300 p-4">
  <h3 class="my-2 text-lg font-semibold">Reports</h3>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <a class="bg-blue-500 p-4 text-center text-white" href="/main/machines/{machine.id}/payments">Transactions</a>
    <a class="bg-blue-500 p-4 text-center text-white" href="/main/machines/{machine.id}/stocks">Stocks</a>
  </div>
</div>

<div class="flex flex-col border-b border-gray-300 p-4">
  <h3 class="my-2 text-lg font-semibold">Products</h3>
  <div class="flex flex-wrap space-x-2">
    <a class="" href="/main/machines/{machine.id}/slots">Slots</a>
    <a class="" href="/main/machines/{machine.id}/payment">Payments</a>
  </div>
</div>
