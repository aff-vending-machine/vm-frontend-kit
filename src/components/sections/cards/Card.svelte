<script lang="ts">
  import Content from './CardContent.svelte';
  import Header from './CardHeader.svelte';
</script>

<div class="mb-4 flex flex-col bg-white shadow-lg shadow-gray-200 lg:rounded-lg">
  <slot {Header} {Content} />
</div>
