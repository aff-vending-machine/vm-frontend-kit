<!-- Currency -->
<script lang="ts">
  export let amount = 0;
  export let fractionDigits = 0;

  // Reactive statement to format the value whenever `amount` or `fractionDigits` changes
  $: formattedValue = formatValue(amount, fractionDigits);

  // Function to format the value as currency
  function formatValue(amount: number, fractionDigits: number) {
    if (!amount) {
      return '-';
    }

    let value = parseFloat(amount.toFixed(fractionDigits));
    if (!Number.isNaN(value)) {
      return value.toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
        maximumFractionDigits: fractionDigits,
      });
    } else {
      return '฿0';
    }
  }
</script>

<span class="float-right items-end text-right {$$props.class}">
  {formattedValue}
</span>
