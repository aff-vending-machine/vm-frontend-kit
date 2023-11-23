<script lang="ts">
  import Editor from './DrawerEditor.svelte';

  import Drawer from '$components/overlays/drawers/Drawer.svelte';

  export let title: string;
  export let subtitle: string;
</script>

<Drawer let:Header let:Footer let:Body>
  <Header {title} {subtitle} />
  <Body>
    <slot {Editor} />
  </Body>
  <Footer />
</Drawer>
