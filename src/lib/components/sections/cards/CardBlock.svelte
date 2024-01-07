<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="flex-1 rounded-md border-2 border-neutral-light p-4">
  {@render children()}
</div>
