<!-- SlotCard -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tippy } from 'svelte-tippy';
  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/animations/shift-away.css';
  import type { MachineSlot } from '$types/machine_slot';
  import { t } from '$lib/i18n/translations';

  export let slot: MachineSlot;
  export let isEdited: boolean;

  // events
  const dispatch = createEventDispatcher();
  const handleIncreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: increasing(slot) });
  const handleDecreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: decreasing(slot) });
  const handleSelectEvent = () => dispatch('select', { data: slot });

  // helpers
  const decreasing = (slot: MachineSlot) => (slot.stock - 1 < 0 ? 0 : slot.stock - 1);
  const increasing = (slot: MachineSlot) => (slot.stock + 1 > slot.capacity ? slot.capacity : slot.stock + 1);
  const getColor = (slot: MachineSlot) => {
    let style = 'border ';
    if (isEdited) {
      style = 'text-orange-500 border ';
    }

    if (!slot.is_enable) {
      return style + 'border-red-500 bg-red-50 hover:bg-red-100';
    }

    if (slot.capacity == slot.stock) {
      return style + 'border-green-500 bg-green-50 hover:bg-green-100';
    }

    if (slot.stock === 0) {
      return style + 'border-gray-500 bg-gray-200 hover:bg-gray-100';
    }

    if (slot.stock / slot.capacity <= 0.2) {
      return style + 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
    }

    return style + 'border-blue-500 bg-blue-50 hover:bg-blue-100';
  };
  const truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (!str) {
      return '';
    }
    if (str.length <= n) {
      return str;
    }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(' ')) : subString) + '...';
  };

  const tooltip = `
    <div class="m-1">
      <span class="text-center">${slot.code}: ${slot.product?.name}</span>
      <img class="border h-24 w-24 mt-1 mx-auto object-contain bg-white" src=${slot.product?.image_url} />
    </div>
  `;
</script>

<!-- HTML -->
<button
  class={`flex h-36 w-32 flex-col items-center rounded-md p-2 ${getColor(slot)}`}
  use:tippy={{ allowHTML: true, content: tooltip, placement: 'top', animation: 'shift-away' }}
  on:click={handleSelectEvent}
>
  <div class="font-bold">{slot.code}</div>
  <div class="text-center text-xs">
    <span class="overflow-hidden text-ellipsis">
      {truncate(slot.product?.name, 40, false)}
    </span>
  </div>
  <div class="flex-grow" />
  <div class="text-center text-xs">
    {$t('slot.price')}: <span class="font-semibold text-red-500">{slot.product?.sale_price}</span>
  </div>
  <div class="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-1">
    <button
      class="
        h-6 w-6 rounded-sm border border-blue-500 bg-blue-300 text-sm text-white
        hover:border-blue-700 hover:bg-blue-500
        disabled:border-gray-300 disabled:bg-gray-300
      "
      on:click|preventDefault|stopPropagation={handleDecreaseStockEvent}
      disabled={slot.stock === 0}
    >
      -
    </button>
    <div class="mx-auto text-center text-sm">{slot.stock}</div>
    <button
      class="
        h-6 w-6 rounded-sm border border-blue-500 bg-blue-300 text-sm text-white
        hover:border-blue-700 hover:bg-blue-500
      disabled:border-gray-300 disabled:bg-gray-300
      "
      on:click|preventDefault|stopPropagation={handleIncreaseStockEvent}
      disabled={slot.stock === slot.capacity}
    >
      +
    </button>
  </div>
</button>
