<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import { salert } from '$lib/salert';
  import type { MachineEntity } from '$lib/types/machine';

  let { mode, machine, ondelete, onclose } = $props<{
    mode: string;
    machine: MachineEntity;
    ondelete: (id: number) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const ts = setTimeout(() => {
      const id = machine.id;
      if (mode === 'eraser') {
        salert.delete(`${$t('common.delete-message', { text: machine.name })}`, () => ondelete(id));
      }
      onclose();
    }, 100);

    return () => {
      clearTimeout(ts);
    };
  });
</script>
