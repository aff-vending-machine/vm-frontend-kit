<!-- Number.svelte -->
<script lang="ts">
  let { amount = 0 } = $props<{
    class?: string;
    amount: number;
  }>();

  // Function to format the value as number
  function formatValue(amount: number) {
    const value = parseFloat(amount.toFixed(0));
    if (!Number.isNaN(amount)) {
      return value.toLocaleString();
    } else {
      return '0';
    }
  }

  const formattedValue = $derived(formatValue(amount));
</script>

<span class="float-right">{formattedValue}</span>
