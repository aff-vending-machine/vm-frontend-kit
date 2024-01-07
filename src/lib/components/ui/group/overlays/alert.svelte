<script lang="ts">
  import { salert } from '$lib/salert';
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';

  let { mode, group, ondelete, onclose } = $props<{
    mode: string;
    group: CatalogGroupEntity;
    ondelete: (id: number, name: string) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const id = group.id;
    const name = group.name;
    if (mode === 'eraser') {
      salert.delete(`Are you sure to delete ${name} ?`, () => ondelete(id, name));
    }
    onclose();
  });
</script>
