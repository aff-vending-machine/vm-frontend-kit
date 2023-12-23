<script lang="ts">
  import { goto } from '$app/navigation';

  let { data } = $props();

  $effect(() => {
    if (data.options.branches.length === 1) {
      const key = data.options.branches[0].value;
      goto(`/console/${key}`);
    } else {
      goto('/console/all');
    }
  });
</script>
