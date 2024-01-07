<!-- SlotCard -->
<script lang="ts">
  import { flip } from 'svelte/animate';
  import { tippy } from 'svelte-tippy';

  import Image from '$lib/components/elements/images/Image.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineSlotEntity } from '$lib/types/machine_slot';

  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/animations/shift-away.css';
  import { isLinkOrButton } from '$lib/utils/check';

  let { slot, editing, image, onstock, onselect } = $props<{
    slot: MachineSlotEntity;
    editing: boolean;
    image: boolean;
    onstock?: (id: number, value: number) => void;
    onselect?: (value: MachineSlotEntity) => void;
  }>();

  const id = $derived(slot.id);
  const code = $derived(slot.code);
  const stock = $derived(slot.stock);
  const capacity = $derived(slot.capacity);
  const spiral = $derived(slot.spiral);
  const isEnable = $derived(slot.is_enable);
  const productName = $derived(slot.product?.name);
  const productPrice = $derived(slot.product?.sale_price);
  const productImage = $derived(slot.product?.image_url);
  const tooltip = $derived(`
    <div class="m-1 flex flex-col justify-center">
      <span class="text-center">${code}: ${productName}</span>
      <img class="border h-24 w-24 mt-1 mx-auto object-contain bg-white" src=${productImage} />
      <span class="text-center">price: ${productPrice}</span>
    </div>
  `);

  function onIncrease(e: MouseEvent) {
    e.preventDefault();
    onstock && onstock(id, stock + 1 > capacity ? capacity : stock + 1);
  }

  function onDecrease(e: MouseEvent) {
    e.preventDefault();
    onstock && onstock(id, stock - 1 < 0 ? 0 : stock - 1);
  }

  function onSelect(e: MouseEvent) {
    if (!isLinkOrButton(e.target as HTMLElement)) {
      e.preventDefault();
      onselect && onselect(slot);
    }
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      onselect && onselect(slot);
    }
  }

  // helpers
  const color = $derived(
    (() => {
      let style = 'border ';
      if (editing) {
        style = 'text-orange border ';
      }

      if (!isEnable) {
        return style + 'border-danger bg-danger-lightest hover:bg-danger-light';
      }

      if (capacity == stock) {
        return style + 'border-success bg-success-lightest hover:bg-green-light';
      }

      if (stock === 0) {
        return style + 'border-neutral bg-neutral-lightest hover:bg-neutral-light';
      }

      if (stock / (capacity || 1) <= 0.2) {
        return style + 'border-warning bg-warning-lightest hover:bg-warning-light';
      }

      return style + 'border-info bg-info-lightest hover:bg-info-light';
    })(),
  );

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
</script>

<!-- HTML -->
<div
  role="button"
  tabindex="0"
  class="flex h-48 w-40 flex-col items-center rounded-md p-2 {color} relative transition-all"
  style="grid-column: span {spiral || 1} / span {spiral || 1};"
  onclick={onSelect}
  {onkeydown}
  use:tippy={{ allowHTML: true, content: tooltip, placement: 'top', animation: 'shift-away' }}
>
  {#if image}
    <div class="absolute top-8 flex justify-center opacity-20">
      <Image class="max-h-24 max-w-24" src={productImage} alt={productName} />
    </div>
  {/if}
  <div class="font-bold">{code}</div>
  <div class="z-10 bg-neutral-lightest bg-opacity-50 text-center text-sm">
    <span class="overflow-hidden text-ellipsis">
      {truncate(productName || '', 40, false)}
    </span>
  </div>
  <div class="flex-grow" />
  <div class="text-center text-sm">
    {$t('slot.price')}: <span class="font-semibold text-danger">{productPrice}</span>
  </div>
  <div class="flex w-full items-center justify-between rounded-md border border-neutral-light bg-white p-1">
    <button
      class="
        h-6 w-6 rounded-sm border border-info bg-info-light text-sm text-white
        hover:border-info-dark hover:bg-info
        disabled:border-neutral-light disabled:bg-neutral-light
      "
      onclick={onDecrease}
      disabled={stock === 0}
    >
      -
    </button>
    <div class="mx-auto text-center text-sm">{stock}</div>
    <button
      class="
        h-6 w-6 rounded-sm border border-info bg-info-light text-sm text-white
        hover:border-info-dark hover:bg-info
      disabled:border-neutral-light disabled:bg-neutral-light
      "
      onclick={onIncrease}
      disabled={stock === capacity}
    >
      +
    </button>
  </div>
</div>
