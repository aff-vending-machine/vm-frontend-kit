<script lang="ts">
  export let id: string;
  export let label: string;
  export let labelOn: string = 'Enable';
  export let labelOff: string = 'Disable';
  export let value: boolean;
  export let disabled: boolean = false;
</script>

<div>
  <span class="mb-1 block text-sm font-medium">{label}:</span>
  <label for={id}>
    <input
      type="checkbox"
      {id}
      {disabled}
      name={id}
      bind:checked={value}
      on:change
      class="-4 w-4 rounded border border-neutral-light text-info-dark focus:ring-info"
    />
    <span class="ml-2 text-sm">{value ? labelOn : labelOff}</span>
  </label>
</div>
