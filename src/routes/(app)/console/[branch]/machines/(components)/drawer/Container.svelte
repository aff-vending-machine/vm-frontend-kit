<script lang="ts">
  import Editor from './Editor.svelte';
  import Eraser from './Eraser.svelte';
  import Viewer from './Viewer.svelte';

  import Drawer from '$lib/components/overlays/drawers/Drawer.svelte';

  let { title, subtitle } = $props<{
    title: string;
    subtitle: string;
    children: () => any;
  }>();
</script>

<Drawer let:Header let:Footer let:Body>
  <Header {title} {subtitle} />
  <Body>
    <slot {Viewer} {Editor} {Eraser} />
  </Body>
  <Footer />
</Drawer>
