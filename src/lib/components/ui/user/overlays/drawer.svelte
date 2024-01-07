<script lang="ts">
  import type { Snippet } from 'svelte';
  import Drawer from '$lib/components/overlays/drawers/Drawer.svelte';

  import { CreatorFormView as Creator, ViewerFormView as Viewer } from '../forms';

  type Components = {
    Creator?: typeof Creator;
    Viewer?: typeof Viewer;
  };

  let {
    title = '',
    subtitle = '',
    mode,
    onclose,
    children: grandChildren,
  } = $props<{
    title?: string;
    subtitle?: string;
    mode: string;
    onclose: () => void;
    children: Snippet<Components>;
  }>();
</script>

<Drawer {onclose}>
  {#snippet children({ Header, Body })}
    <Header {title} {subtitle} {onclose} />
    <Body>
      {#if mode === 'viewer'}
        {@render grandChildren({ Viewer })}
      {:else if mode === 'creator'}
        {@render grandChildren({ Creator })}
      {/if}
    </Body>
  {/snippet}
</Drawer>
