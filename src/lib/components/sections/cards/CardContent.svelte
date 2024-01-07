<script lang="ts">
  import type { Snippet } from 'svelte';

  let { row, children } = $props<{
    row?: boolean;
    children: Snippet;
  }>();
</script>

<div
  class="mb-2 flex border-b border-neutral-light p-4 last:border-0 max-lg:flex-col max-lg:space-y-4"
  class:lg:flex-row={row}
  class:lg:space-x-4={row}
  class:flex-col={!row}
  class:space-y-4={!row}
>
  {@render children()}
</div>
