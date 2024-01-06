<script lang="ts">
  import type { Snippet } from 'svelte';
  import Block from './CardBlock.svelte';
  import Content from './CardContent.svelte';
  import Header from './CardHeader.svelte';

  type Components = {
    Header: typeof Header;
    Content: typeof Content;
    Block: typeof Block;
  };

  let { children } = $props<{
    children: Snippet<Components>;
  }>();
</script>

<div class="mb-4 flex flex-col bg-white shadow-lg shadow-neutral-light lg:rounded-lg">
  {@render children({ Header, Content, Block })}
</div>
