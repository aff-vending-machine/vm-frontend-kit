<script lang="ts">
  let {
    id,
    label,
    value,
    labelOn = 'Enable',
    labelOff = 'Disable',
    disabled = false,
    onchange,
  } = $props<{
    id: string;
    label: string;
    value: boolean;
    labelOn?: string;
    labelOff?: string;
    disabled?: boolean;
    onchange?: (checked: boolean) => void;
  }>();

  async function onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).checked;
    value = newValue;
    onchange && onchange(newValue);
  }
</script>

<div class="select-none">
  <span class="mb-1 block text-sm font-medium">{label}:</span>
  <label for={id}>
    <input
      class="-4 w-4 rounded border border-neutral-light text-info-dark focus:ring-info"
      type="checkbox"
      {id}
      {disabled}
      name={id}
      bind:checked={value}
      onchange={onChange}
    />
    <span class="ml-2 cursor-pointer text-sm">{value ? labelOn : labelOff}</span>
  </label>
</div>
