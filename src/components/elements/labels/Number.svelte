<!-- Number.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let value: number;
  let formattedValue: string;

  export let amount = 0;

  // Function to format the value as number
  function formatValue() {
    value = parseFloat(amount.toFixed(0));
    if (!Number.isNaN(amount)) {
      formattedValue = value.toLocaleString();
    } else {
      formattedValue = '0';
    }
  }

  // Run the formatValue function on component mount and whenever the amount changes
  onMount(formatValue);
  $: formatValue();
</script>

<span class="float-right">{formattedValue}</span>
