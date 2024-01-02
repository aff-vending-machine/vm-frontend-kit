<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { ChangeEventHandler } from 'svelte/elements';

  let {
    id,
    label,
    value,
    iconOff = 'mdi:view-dashboard',
    iconOn = 'mdi:table',
    disabled = false,
    onchange,
  } = $props<{
    id: string;
    label: string;
    value: boolean;
    iconOff?: string;
    iconOn?: string;
    disabled?: boolean;
    onchange?: ChangeEventHandler<HTMLInputElement>;
  }>();
</script>

<div>
  <span class="mb-1 block text-sm font-medium">{label}:</span>
  <label for={id}>
    <input type="checkbox" name={id} {id} class="sr-only" checked={value} {disabled} {onchange} />
    <div class="flex h-8 w-20 items-center justify-center rounded-md bg-white">
      <span
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-all {value
          ? ''
          : 'bg-primary text-white'}"
      >
        <Icon icon={iconOff} class="h-6 w-6" />
      </span>
      <span
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-all {value
          ? 'bg-primary text-white'
          : ''}"
      >
        <Icon icon={iconOn} class="h-6 w-6" />
      </span>
    </div>
  </label>
</div>
