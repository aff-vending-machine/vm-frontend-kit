<script lang="ts">
  import Header from './CardHeader.svelte';
  import Content from './CardContent.svelte';
</script>

<div class="flex flex-col bg-white shadow-lg shadow-gray-200 lg:rounded-lg">
  <slot {Header} {Content} />
</div>
