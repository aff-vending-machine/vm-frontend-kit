<!-- SlotCard -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tippy } from 'svelte-tippy';

  import Image from '$components/elements/images/Image.svelte';
  import { mousePress } from '$lib/hooks/useMousePress';
  import { t } from '$lib/i18n/translations';
  import type { MachineSlot } from '$types/machine_slot';

  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/animations/shift-away.css';

  export let slot: MachineSlot;
  export let editing: boolean;
  export let image: boolean;
  // events
  const dispatch = createEventDispatcher();
  const handleIncreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: increasing(slot) });
  const handleDecreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: decreasing(slot) });
  const handleSelectEvent = () => dispatch('select', { id: slot.id, data: slot });

  // helpers
  const decreasing = (slot: MachineSlot) => (slot.stock - 1 < 0 ? 0 : slot.stock - 1);
  const increasing = (slot: MachineSlot) => (slot.stock + 1 > slot.capacity ? slot.capacity : slot.stock + 1);
  $: getColor = (slot: MachineSlot) => {
    let style = 'border ';
    if (editing) {
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

  $: tooltip = `
    <div class="m-1 flex flex-col justify-center">
      <span class="text-center">${slot.code}: ${slot.product.name}</span>
      <img class="border h-24 w-24 mt-1 mx-auto object-contain bg-white" src=${slot.product.image_url} />
      <span class="text-center">price: ${slot.product.sale_price}</span>
    </div>
  `;
</script>

<!-- HTML -->
<button
  class="flex h-48 w-40 flex-col items-center rounded-md p-2 {getColor(slot)} relative"
  style="column-span: {slot.spiral || 1};"
  use:tippy={{ allowHTML: true, content: tooltip, placement: 'top', animation: 'shift-away' }}
  on:click={handleSelectEvent}
>
  {#if image}
    <div class="absolute top-8 flex justify-center opacity-20">
      <Image class="max-w-24 max-h-24" src={slot.product.image_url} alt={slot.product.name} />
    </div>
  {/if}
  <div class="font-bold">{slot.code}</div>
  <div class="z-10 bg-slate-100 bg-opacity-50 text-center text-sm">
    <span class="overflow-hidden text-ellipsis">
      {truncate(slot.product.name, 40, false)}
    </span>
  </div>
  <div class="flex-grow" />
  <div class="text-center text-sm">
    {$t('slot.price')}: <span class="font-semibold text-red-500">{slot.product.sale_price}</span>
  </div>
  <div class="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-1">
    <button
      class="
        h-6 w-6 rounded-sm border border-blue-500 bg-blue-300 text-sm text-white
        hover:border-blue-700 hover:bg-blue-500
        disabled:border-gray-300 disabled:bg-gray-300
      "
      use:mousePress
      on:click|preventDefault|stopPropagation={handleDecreaseStockEvent}
      on:mouse-press={handleDecreaseStockEvent}
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
      use:mousePress
      on:click|preventDefault|stopPropagation={handleIncreaseStockEvent}
      on:mouse-press={handleIncreaseStockEvent}
      disabled={slot.stock === slot.capacity}
    >
      +
    </button>
  </div>
</button>
