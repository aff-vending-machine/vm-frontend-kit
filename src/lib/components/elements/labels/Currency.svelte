<!-- Currency -->
<script lang="ts">
  let {
    class: className = '',
    amount = 0,
    fractionDigits = 0,
  } = $props<{
    class?: string;
    amount?: number;
    fractionDigits?: number;
  }>();

  // Reactive statement to format the value whenever `amount` or `fractionDigits` changes
  const formattedValue = $derived(formatValue(amount, fractionDigits));

  // Function to format the value as currency
  function formatValue(amount: number, fractionDigits: number) {
    if (!amount) {
      return '-';
    }

    const value = parseFloat(amount.toFixed(fractionDigits));
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

<span class="float-right items-end text-right {className}">
  {formattedValue}
</span>
