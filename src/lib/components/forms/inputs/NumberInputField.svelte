<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: number;
  export let error: string | null = null;
  export let min: number = 0;
  export let max: number = 1000000;
</script>

<div>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <input
    type="number"
    {id}
    name={id}
    bind:value
    on:input
    on:change
    {min}
    {max}
    class="w-full min-w-[120px] rounded border border-neutral-light px-2 py-1 text-sm text-neutral-dark"
  />
  {#if error}
    <p class="m-2 text-sm text-danger">{error}</p>
  {/if}
</div>
