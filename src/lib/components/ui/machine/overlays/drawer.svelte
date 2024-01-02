<script lang="ts">
  import type { Snippet } from 'svelte';
  import Drawer from '$lib/components/overlays/drawers/Drawer.svelte';

  import { EditorFormView as Editor, ViewerFormView as Viewer } from '../forms';

  type Components = {
    Editor?: typeof Editor;
    Viewer?: typeof Viewer;
  };

  let {
    title,
    subtitle,
    mode,
    onclose,
    children: grandChildren,
  } = $props<{
    title: string;
    subtitle: string;
    mode: string;
    onclose: () => void;
    children: Snippet<Components>;
  }>();
</script>

<Drawer show={mode !== 'none'} {onclose}>
  {#snippet children({ Header, Body })}
    <Header {title} {subtitle} {onclose} />
    <Body>
      {#if mode === 'viewer'}
        {@render grandChildren({ Viewer })}
      {:else if mode === 'editor'}
        {@render grandChildren({ Editor })}
      {/if}
    </Body>
  {/snippet}
</Drawer>
