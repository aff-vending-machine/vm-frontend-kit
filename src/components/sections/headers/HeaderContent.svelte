<script lang="ts">
  import { Hamburger } from 'svelte-hamburgers';
  import Language from '$components/elements/switchers/Language.svelte';
  import Theme from '$components/elements/switchers/Theme.svelte';
  import Profile from '$components/sections/profiles/Profile.svelte';
</script>

<div class="flex h-12 items-center space-x-2">
  <slot {Hamburger} {Language} {Theme} {Profile} />
</div>
