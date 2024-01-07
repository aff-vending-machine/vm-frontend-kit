<script lang="ts">
  import { page } from '$app/stores';
  import { generateRandomNumber } from '$lib/helpers/generator';
  import type { StoreBranch } from '$lib/types/store_branch';
  import type { ChangeEventHandler, EventHandler } from 'svelte/elements';

  type BranchOptionsType = {
    label: string;
    value: string;
    data: StoreBranch;
  };

  let { label, value, placeholder, options, ...restProps } = $props<{
    label: string;
    value: string;
    options: BranchOptionsType[];
    placeholder?: string;
    onchange?: ChangeEventHandler<HTMLSelectElement>;
  }>();

  const id = generateRandomNumber();
  const onlyOneOptions = $derived(options.length <= 1);
  const paramsCount = $derived(Object.keys($page.params).length);
  const disabled = $derived(onlyOneOptions || paramsCount > 1);
</script>

<div class="relative">
  <select class="peer hidden" {id} {disabled} bind:value {...restProps}>
    {#if !onlyOneOptions}
      <option class="text-neutral" value="all">{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <label for={id}>{label}</label>
</div>

<style lang="scss">
  select {
    @apply block w-full rounded-lg border-neutral-light p-4 pe-9 text-sm;
    @apply focus:border-primary focus:pb-2 focus:pt-6 focus:ring-primary;
    @apply autofill:pb-2 autofill:pt-6;
    @apply disabled:pointer-events-none disabled:opacity-50;
    @apply [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6;

    @apply dark:border-neutral-dark dark:bg-neutral-darkest dark:text-neutral;
    @apply dark:focus:ring-neutral;
  }

  label {
    @apply pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 transition duration-100 ease-in-out;
    @apply peer-focus:-translate-y-1.5 peer-focus:text-xs peer-focus:text-neutral;
    @apply peer-disabled:pointer-events-none peer-disabled:opacity-50;
    @apply peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neutral;

    @apply dark:text-white;
  }
</style>
