<script lang="ts">
  let {
    class: className,
    id,
    label,
    value,
    error = null,
    disabled = false,
  } = $props<{
    class?: string;
    id: string;
    label: string;
    value: string;
    error?: string | null;
    disabled?: boolean;
  }>();
</script>

<div class={className}>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <input
    type="password"
    {id}
    {disabled}
    name={id}
    bind:value
    on:input
    on:change
    class="w-full min-w-[120px] rounded border border-neutral-light px-2 py-1 text-sm text-neutral-dark disabled:border-primary-light disabled:text-info"
  />
  {#if error}
    <p class="m-2 text-xs text-danger">{error}</p>
  {/if}
</div>
