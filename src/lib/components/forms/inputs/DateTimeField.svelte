<script lang="ts">
  import DateTimePicker from '../datetime/DateTimePicker.svelte';

  export let id: string;
  export let label: string;
  export let value: Date;
  export let rangeFrom: Date;
  export let rangeTo: Date;
  export let error: string | null = null;
</script>

<div class={$$props.class}>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <DateTimePicker {id} {rangeFrom} {rangeTo} {value} on:change on:input />
  {#if error}
    <p class="m-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
