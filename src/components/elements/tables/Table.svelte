<script lang="ts">
  import Loading from './TableLoading.svelte';
  import Header from './TableHeader.svelte';
  import Body from './TableBody.svelte';
  import Footer from './TableFooter.svelte';
</script>

<table class="w-full border-collapse select-none overflow-y-auto overflow-x-hidden bg-white font-mono text-gray-500">
  <slot {Header} {Body} {Loading} {Footer} />
</table>
