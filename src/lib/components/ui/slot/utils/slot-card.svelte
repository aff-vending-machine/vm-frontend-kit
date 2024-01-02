<!-- SlotCard -->
<script lang="ts">
  import { tippy } from 'svelte-tippy';

  import Image from '$lib/components/elements/images/Image.svelte';
  import { mousePress } from '$lib/hooks/useMousePress';
  import { t } from '$lib/i18n/translations';
  import type { MachineSlotEntity } from '$lib/types/machine_slot';

  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/animations/shift-away.css';

  let { slot, editing, image, onstock, onselect } = $props<{
    slot: MachineSlotEntity;
    editing: boolean;
    image: boolean;
    onstock?: (id: number, value: number) => void;
    onselect?: (value: MachineSlotEntity) => void;
  }>();

  function onIncrease(e: MouseEvent) {
    e.preventDefault();
    onstock && onstock(slot.id, increasing(slot));
  }

  function onDecrease(e: MouseEvent) {
    e.preventDefault();
    onstock && onstock(slot.id, decreasing(slot));
  }

  function onSelect(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      onselect && onselect(slot);
    }
  }

  // helpers
  const decreasing = (slot: MachineSlotEntity) => (slot.stock - 1 < 0 ? 0 : slot.stock - 1);
  const increasing = (slot: MachineSlotEntity) => (slot.stock + 1 > slot.capacity ? slot.capacity : slot.stock + 1);

  const getColor = (slot: MachineSlotEntity) => {
    let style = 'border ';
    if (editing) {
      style = 'text-orange border ';
    }

    if (!slot.is_enable) {
      return style + 'border-danger bg-danger-lightest hover:bg-danger-light';
    }

    if (slot.capacity == slot.stock) {
      return style + 'border-success bg-success-lightest hover:bg-green-light';
    }

    if (slot.stock === 0) {
      return style + 'border-neutral bg-neutral-lightest hover:bg-neutral-light';
    }

    if (slot.stock / (slot.capacity || 1) <= 0.2) {
      return style + 'border-warning bg-warning-lightest hover:bg-warning-light';
    }

    return style + 'border-info bg-info-lightest hover:bg-info-light';
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
    <div class="m-1 flex flex-col justify-center">
      <span class="text-center">${slot.code}: ${slot.product?.name}</span>
      <img class="border h-24 w-24 mt-1 mx-auto object-contain bg-white" src=${slot.product?.image_url} />
      <span class="text-center">price: ${slot.product?.sale_price}</span>
    </div>
  `;
</script>

<!-- HTML -->
<div
  role="button"
  tabindex="0"
  class="flex h-48 w-40 flex-col items-center rounded-md p-2 {getColor(slot)} relative transition-all"
  style="grid-column: span {slot.spiral || 1} / span {slot.spiral || 1};"
  onclickcapture={onSelect}
  use:tippy={{ allowHTML: true, content: tooltip, placement: 'top', animation: 'shift-away' }}
>
  {#if image}
    <div class="absolute top-8 flex justify-center opacity-20">
      <Image class="max-h-24 max-w-24" src={slot.product?.image_url} alt={slot.product?.name} />
    </div>
  {/if}
  <div class="font-bold">{slot.code}</div>
  <div class="z-10 bg-neutral-lightest bg-opacity-50 text-center text-sm">
    <span class="overflow-hidden text-ellipsis">
      {truncate(slot.product?.name || '', 40, false)}
    </span>
  </div>
  <div class="flex-grow" />
  <div class="text-center text-sm">
    {$t('slot.price')}: <span class="font-semibold text-danger">{slot.product?.sale_price}</span>
  </div>
  <div class="flex w-full items-center justify-between rounded-md border border-neutral-light bg-white p-1">
    <button
      class="
        h-6 w-6 rounded-sm border border-info bg-info-light text-sm text-white
        hover:border-info-dark hover:bg-info
        disabled:border-neutral-light disabled:bg-neutral-light
      "
      onclick={onDecrease}
      disabled={slot.stock === 0}
    >
      -
    </button>
    <div class="mx-auto text-center text-sm">{slot.stock}</div>
    <button
      class="
        h-6 w-6 rounded-sm border border-info bg-info-light text-sm text-white
        hover:border-info-dark hover:bg-info
      disabled:border-neutral-light disabled:bg-neutral-light
      "
      onclick={onIncrease}
      disabled={slot.stock === slot.capacity}
    >
      +
    </button>
  </div>
</div>
