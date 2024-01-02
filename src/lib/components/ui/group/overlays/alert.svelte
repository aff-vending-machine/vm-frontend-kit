<script lang="ts">
  import { salert } from '$lib/salert';
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';

  let { mode, group, ondelete, onclose } = $props<{
    mode: string;
    group: CatalogGroupEntity;
    ondelete: (id: number) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const id = group.id;
    if (mode === 'eraser') {
      salert.delete(`Are you sure to delete ${group.name} ?`, () => ondelete(id));
    }
    onclose();
  });
</script>
