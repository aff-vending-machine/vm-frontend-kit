<script lang="ts">
  import { Hamburger } from 'svelte-hamburgers';

  import Profile from './HeaderProfile.svelte';

  import Language from '$lib/components/elements/switchers/Language.svelte';
  import Theme from '$lib/components/elements/switchers/Theme.svelte';
</script>

<div class="flex h-12 items-center space-x-2">
  <slot {Hamburger} {Language} {Theme} {Profile} />
</div>
