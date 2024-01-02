<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="relative h-full w-full dark:bg-neutral-dark dark:text-neutral-light">
  <div class="absolute inset-0 h-full w-full overflow-auto p-4">
    {@render children()}
  </div>
</div>
