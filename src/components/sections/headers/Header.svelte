<script lang="ts">
  import Content from './HeaderContent.svelte';
</script>

<div class="flex justify-between bg-white px-4 shadow-lg shadow-gray-200 lg:rounded-lg">
  <slot {Content} />
</div>
