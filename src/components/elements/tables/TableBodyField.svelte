<!-- TableRender -->
<script lang="ts">
  import Image from '$components/elements/images/Image.svelte';
  import Currency from '$components/elements/labels/Currency.svelte';
  import Number from '$components/elements/labels/Number.svelte';
  import type { TableFieldType } from './@table';

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  export let value: any;
  export let type: TableFieldType;
  export let source: unknown;
</script>

<!-- HTML -->
{#if type === 'component'}
  <svelte:component this={value} {source} on:action />
{:else if type === 'image'}
  <Image src={value} alt={value} class="h-auto w-16" />
{:else if type === 'number'}
  <Number amount={value} />
{:else if type === 'currency'}
  <Currency amount={value} />
{:else if type === 'date'}
  <time>{value}</time>
{:else if type === 'array'}
  <span>{value.join(', ')}</span>
{:else}
  <span>{value}</span>
{/if}
