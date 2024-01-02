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
    class="disabled:text-blue-500 w-full min-w-[120px] rounded border border-neutral-light px-2 py-1 text-sm text-neutral-dark disabled:border-primary-light"
  />
  {#if error}
    <p class="m-2 text-xs text-danger">{error}</p>
  {/if}
</div>
