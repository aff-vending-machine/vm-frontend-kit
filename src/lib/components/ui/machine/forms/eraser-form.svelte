<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineEntity } from '$lib/types/machine';

  let { machine, ondelete, oncancel } = $props<{
    machine: MachineEntity;
    ondelete: (id: number) => void;
    oncancel: () => void;
  }>();

  function onDelete(e: MouseEvent) {
    e.preventDefault();
    ondelete(machine.id);
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="m-2 h-full overflow-y-auto">
  <div class="space-y-4 rounded-md p-2 text-sm">
    <p class="my-4 text-center text-lg">
      {$t('common.delete-message')} "<span class="text-danger">{machine.name}</span>"?
    </p>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="danger" onclick={onDelete}>
      {$t('common.button.delete')}
    </Button>
    <Button color="warning" outline onclick={onCancel}>
      {$t('common.button.cancel')}
    </Button>
  </div>
</div>
