<script lang="ts">
  import Editor from './Editor.svelte';
  import Eraser from './Eraser.svelte';
  import Viewer from './Viewer.svelte';

  import Drawer from '$components/overlays/drawers/Drawer.svelte';

  export let title: string;
  export let subtitle: string;
</script>

<Drawer let:Header let:Footer let:Body>
  <Header {title} {subtitle} />
  <Body>
    <slot {Viewer} {Editor} {Eraser} />
  </Body>
  <Footer />
</Drawer>
