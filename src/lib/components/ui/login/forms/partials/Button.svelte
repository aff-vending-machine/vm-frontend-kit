<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, ...restProps } = $props<{
    form?: string;
    disabled?: boolean;
    children: Snippet<void>;
  }>();
</script>

<button type="submit" {...restProps}>
  {@render children()}
</button>

<style lang="scss">
  button {
    @apply w-full rounded-md bg-primary p-2 text-sm text-neutral-lightest shadow shadow-primary-light;
    @apply hover:bg-primary-light;
    @apply disabled:bg-neutral-light disabled:text-neutral disabled:shadow-neutral-light;
  }
</style>
