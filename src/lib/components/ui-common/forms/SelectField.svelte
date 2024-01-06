<script lang="ts">
  import type { SelectOptionsType } from '$lib/utils/options';

  let {
    id,
    value,
    options,
    label = null,
    error = null,
    placeholder = 'Select an option',
    unselected = undefined,
    disabled = false,
    hidden = false,
    onchange,
  } = $props<{
    id: string;
    value: unknown;
    options: SelectOptionsType[];
    label?: string | null;
    error?: string | null;
    placeholder?: string;
    unselected?: unknown;
    disabled?: boolean;
    hidden?: boolean;
    onchange?: (value: string) => void;
  }>();

  $effect(() => {
    if (options.length === 1) {
      value = options[0].value;
    }
  });

  async function onChange(event: Event) {
    const newValue = (event.target as HTMLSelectElement).value;
    value = newValue;
    onchange && onchange(newValue);
  }
</script>

<div class:hidden>
  {#if label}
    <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  {/if}
  <select
    {id}
    name={id}
    disabled={disabled || (!unselected && options.length === 1)}
    bind:value
    onchange={onChange}
    class="w-full rounded-sm border border-neutral-light py-1 pl-2 pr-8 text-sm text-neutral-dark sm:w-full"
  >
    {#if unselected !== undefined && options.length > 1}
      <option class="text-neutral" value={unselected} disabled={unselected === null}>{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="m-2 text-sm text-danger">{error}</p>
  {/if}
</div>
