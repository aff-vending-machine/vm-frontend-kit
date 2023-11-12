<script lang="ts">
  import Content from './CardContent.svelte';
</script>

<div class="flex flex-col bg-white shadow-lg shadow-gray-200 lg:rounded-lg" data-sveltekit-reload>
  <slot {Content} />
</div>
