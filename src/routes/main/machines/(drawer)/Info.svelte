<!-- MachineViewer -->
<script lang="ts">
  import type { Machine } from '$lib/services/machine';

  export let machine: Machine;

  function label(title: string) {
    return title.replaceAll('_', ' ');
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  function value(key: string, val: unknown) {
    switch (key as keyof Machine) {
      case 'sync_time':
      case 'sync_channel_time':
      case 'sync_slot_time':
      case 'sync_transaction_time':
      case 'created_at':
      case 'updated_at':
        if (val instanceof Date) {
          return Intl.DateTimeFormat('en-US', options).format(val);
        }
        return '-';

      case 'branch':
        return 'branch';

      default:
        return val?.toString();
    }
  }

  $: data = Object.entries(machine).map(([key, val]) => ({ label: label(key), value: value(key, val) }));
</script>

<div class="flex flex-col border-b border-gray-300 p-4">
  <h3 class="my-2 text-lg font-semibold">Information</h3>
  <div class="grid grid-cols-2 gap-2">
    {#each data as item}
      <div><span class="">{item.label}</span>: <span class="text-sm text-gray-500">{item.value}</span></div>
    {/each}
  </div>
</div>
