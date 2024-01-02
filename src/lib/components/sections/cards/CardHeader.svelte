<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="mb-2">
  <h3 class="font-semibold">
    {@render children()}
  </h3>
</div>
