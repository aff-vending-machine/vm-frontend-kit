<script lang="ts">
  import '../app.css';
  import { version } from '$app/environment';
</script>

<svelte:head>
  <title>Vending Machine</title>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<slot />
<div class="absolute bottom-0 right-1 text-[0.6rem] text-gray-400">ver. {version}</div>
