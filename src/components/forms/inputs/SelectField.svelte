<script lang="ts">
  type SelectOptionsType = {
    label: string;
    value: unknown;
    filter?: unknown;
  };

  export let id: string;
  export let label: string;
  export let value: unknown;
  export let error: string | null = null;
  export let options: SelectOptionsType[];
  export let placeholder = 'Select an option';
  export let unselected = false;
  export let disabled = false;
  export let hidden = false;
</script>

<div class={$$props.class} class:hidden>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <select
    {id}
    name={id}
    {disabled}
    bind:value
    on:change
    class="w-full min-w-[120px] rounded border border-gray-300 px-2 py-1 text-sm text-gray-700"
  >
    {#if unselected}
      <option value="">{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="m-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
