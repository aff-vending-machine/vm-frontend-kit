<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<tfoot class="border-y border-primary-light bg-neutral-lightest font-bold">
  {@render children()}
</tfoot>
