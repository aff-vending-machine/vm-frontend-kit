<script lang="ts">
  import type { Snippet } from 'svelte';
  import Modal from '$lib/components/overlays/modals/Modal.svelte';

  type Components = {};

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

<Modal show={mode !== 'none'} {onclose}>
  {#snippet children({ Header, Body })}
    <Header {title} {subtitle} {onclose} />
    <Body>
      <div />
    </Body>
  {/snippet}
</Modal>
