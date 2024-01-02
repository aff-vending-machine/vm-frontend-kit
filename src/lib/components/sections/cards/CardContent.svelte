<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="mb-2 flex flex-col border-b border-neutral-light p-4 last:border-0">
  {@render children()}
</div>
