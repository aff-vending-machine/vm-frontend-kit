<script lang="ts">
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineEntity } from '$lib/types/machine';
  import { isLink } from '$lib/utils/check';

  let { source, onselect } = $props<{
    source: MachineEntity[];
    onselect: (m: MachineEntity) => void;
  }>();

  function onMachineClick(data: MachineEntity) {
    return (e: MouseEvent) => {
      e.stopPropagation();
      if (!isLink(e.target as HTMLElement)) {
        onselect && onselect(data);
      }
    };
  }

  function getColorStatus(status: string) {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'maintainance':
        return 'bg-warning';
      case 'offline':
        return 'bg-neutral';
      default:
        return 'bg-info';
    }
  }
</script>

<div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
  {#each source as machine (machine.id)}
    <button
      class="relative justify-center space-y-4 rounded border border-neutral-lightest bg-neutral-lightest p-4 hover:bg-primary-lightest hover:shadow-md"
      onclick={onMachineClick(machine)}
    >
      <div class="absolute left-2 right-2 top-0 flex items-baseline justify-between">
        <div>
          <span class="px-2 text-xs text-primary transition-all">{machine.branch?.name}</span>
        </div>
        <div class="mt-2 h-4 w-4 rounded-full {getColorStatus(machine.status)} group hover:w-auto">
          <span class="hidden px-2 text-xs text-white transition-all group-hover:block">{machine.status}</span>
        </div>
      </div>

      <div class="flex flex-col text-center">
        <h3 class="p-4 text-xl font-semibold">{machine.name}</h3>
        <div class="flex flex-col">
          <span class="text-xs">{machine.serial_number}</span>
          <span class="text-xs">{$t('common.temperature')} {machine.temperature ?? '-'} °C</span>
        </div>
      </div>

      <div class="flex space-x-4">
        <ButtonLink href="machines/{machine.id}/slots" color="accent" outline class="flex-1">
          {$t('common.button.slots')}
        </ButtonLink>
        <ButtonLink href="machines/{machine.id}/payments" color="secondary" outline class="flex-1">
          {$t('common.button.payments')}
        </ButtonLink>
      </div>
    </button>
  {/each}
</div>
