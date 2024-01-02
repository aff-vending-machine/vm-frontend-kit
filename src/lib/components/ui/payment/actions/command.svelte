<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';

  let { onsync } = $props<{
    onsync: () => void;
  }>();

  function onSync(e: MouseEvent) {
    e.preventDefault();
    onsync();
  }
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <Button color="accent" onclick={onSync}>Sync</Button>
</div>
