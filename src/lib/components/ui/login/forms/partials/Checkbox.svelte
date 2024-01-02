<script lang="ts">
  import { generateRandomNumber } from '$lib/helpers/generator';

  let { label, checked, ...restProps } = $props<{
    label: string;
    checked: boolean;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
  }>();

  const id = generateRandomNumber();
</script>

<div class="flex space-x-2">
  <input
    {id}
    type="checkbox"
    class="rounded border-neutral-light disabled:bg-neutral-lightest"
    bind:checked
    {...restProps}
  />
  <label for={id} class="mr-2 cursor-pointer text-sm text-neutral disabled:cursor-not-allowed">
    {label}
  </label>
</div>
