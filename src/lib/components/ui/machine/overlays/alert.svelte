<script lang="ts">
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
    const id = machine.id;
    if (mode === 'eraser') {
      salert.delete(`Are you sure to delete ${machine.name} ?`, () => ondelete(id));
    }
    onclose();
  });
</script>
