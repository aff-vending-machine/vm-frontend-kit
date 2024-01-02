<script lang="ts">
  import type { Snippet } from 'svelte';
  import Drawer from '$lib/components/overlays/drawers/Drawer.svelte';

  import { EditorFormView as Editor } from '../forms';

  type Components = {
    Editor?: typeof Editor;
  };

  let {
    title,
    subtitle,
    mode,
    onclose,
    children: grandChildren,
  } = $props<{
    title?: string;
    subtitle?: string;
    mode: 'editor' | 'none';
    onclose: () => void;
    children: Snippet<Components>;
  }>();
</script>

<Drawer show={mode !== 'none'} {onclose}>
  {#snippet children({ Header, Footer, Body })}
    <Header {title} {subtitle} />
    <Body>
      {#if mode === 'editor'}
        {@render grandChildren({ Editor })}
      {/if}
    </Body>
  {/snippet}
</Drawer>
