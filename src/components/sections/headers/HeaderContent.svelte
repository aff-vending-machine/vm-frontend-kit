<script lang="ts">
  import { Hamburger } from 'svelte-hamburgers';

  import Profile from './HeaderProfile.svelte';

  import Language from '$components/elements/switchers/Language.svelte';
  import Theme from '$components/elements/switchers/Theme.svelte';
</script>

<div class="flex h-12 items-center space-x-2">
  <slot {Hamburger} {Language} {Theme} {Profile} />
</div>
