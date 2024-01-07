<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="flex w-full border-b border-neutral-light bg-neutral-light p-6">
  <div class="flex flex-1 flex-col">
    {@render children()}
  </div>
</div>
