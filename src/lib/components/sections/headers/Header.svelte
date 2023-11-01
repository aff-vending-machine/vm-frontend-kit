<script lang="ts">
  import Breadcrumb from '$lib/components/navigations/breadcrumbs/Breadcrumb.svelte';
  import { page } from '$app/stores';
  // export let active: boolean;
  // export let text = '';
</script>

<div class="flex flex-col-reverse justify-between space-x-2 sm:flex-row">
  <Breadcrumb path={$page.url.pathname} />
  <div class="flex justify-end space-x-8 sm:justify-between">
    <!-- <Navbar bind:active /> -->
  </div>
</div>
