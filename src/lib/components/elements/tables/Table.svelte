<script lang="ts">
  import Body from './TableBody.svelte';
  import Footer from './TableFooter.svelte';
  import Header from './TableHeader.svelte';
  import Loading from './TableLoading.svelte';
</script>

<table class="w-full border-collapse select-none overflow-x-auto overflow-y-auto bg-white font-mono text-gray-500">
  <slot {Header} {Body} {Loading} {Footer} />
</table>
