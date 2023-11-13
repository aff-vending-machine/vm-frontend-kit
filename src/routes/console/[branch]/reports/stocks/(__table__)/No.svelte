<script lang="ts">
  export let index: number;
  export let source: unknown;

  $: _ = source;
</script>

<div class="flex justify-center space-x-2">
  {index + 1}
</div>
