<!-- TableRender -->
<script lang="ts">
  import dayjs from 'dayjs';

  import type { TableFieldType } from './table';

  import Image from '$lib/components/elements/images/Image.svelte';
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import Number from '$lib/components/elements/labels/Number.svelte';
  import type { Entity } from '$lib/types/common';

  let {
    index,
    value,
    type,
    source = [],
    onaction,
  } = $props<{
    index: number;
    value: any;
    type: TableFieldType;
    source: unknown;
    onaction?: (mode: string, data: Entity) => void;
  }>();
</script>

<!-- HTML -->
{#if type === 'component'}
  <svelte:component this={value} {index} {source} {onaction} />
{:else if type === 'image'}
  <Image src={value} alt={value} class="h-auto w-16" />
{:else if type === 'number'}
  <Number amount={value} />
{:else if type === 'currency'}
  <Currency amount={value} />
{:else if type === 'date'}
  <time>{dayjs(value).format('DD MMM YYYY HH:mm:ss')}</time>
{:else if type === 'array'}
  <span>{value.join(', ')}</span>
{:else}
  <span>{value}</span>
{/if}
