<script lang="ts">
  import { generateRandomNumber } from '$lib/helpers/generator';

  let { label, value, ...restProps } = $props<{
    label: string;
    value: string;
    type: 'text' | 'password';
    name?: string;
    placeholder?: string;
    disabled?: boolean;
  }>();

  const id = generateRandomNumber();
</script>

<div class="flex flex-col space-y-2">
  <label for={id} class="text-sm uppercase text-neutral">{label}</label>
  <input {id} autocomplete="off" bind:value required {...restProps} />
</div>

<style lang="scss">
  input {
    @apply block rounded-lg border-neutral-light px-4 py-3 text-sm;
    @apply focus:border-primary focus:ring-primary;
    @apply disabled:pointer-events-none disabled:opacity-50;

    @apply dark:border-neutral-dark dark:bg-neutral-darkest dark:text-neutral-light;
    @apply dark:focus:ring-neutral;
  }
</style>
