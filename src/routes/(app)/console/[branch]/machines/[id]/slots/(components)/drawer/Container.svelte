<script lang="ts">
  import Creator from './Creator.svelte';
  import Editor from './Editor.svelte';
  import Eraser from './Eraser.svelte';

  import Drawer from '$lib/components/overlays/drawers/Drawer.svelte';

  export let title: string;
  export let subtitle: string;
</script>

<Drawer let:Header let:Footer let:Body>
  <Header {title} {subtitle} />
  <Body>
    <slot {Creator} {Editor} {Eraser} />
  </Body>
  <Footer />
</Drawer>
