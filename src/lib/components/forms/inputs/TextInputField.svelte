<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string;
  export let error: string | null = null;
  export let disabled: boolean = false;
</script>

<div class={$$props.class}>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <input
    type="text"
    {id}
    {disabled}
    name={id}
    bind:value
    on:input
    on:change
    class="w-full min-w-[120px] rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 disabled:border-blue-300 disabled:text-blue-500"
  />
  {#if error}
    <p class="m-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
