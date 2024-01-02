<script lang="ts">
  import { salert } from '$lib/salert';
  import type { CatalogProductEntity } from '$lib/types/catalog_product';

  let { mode, product, ondelete, onclose } = $props<{
    mode: string;
    product: CatalogProductEntity;
    ondelete: (id: number) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const id = product.id;
    if (mode === 'eraser') {
      salert.delete(`Are you sure to delete ${product.name} ?`, () => ondelete(id));
    }
    onclose();
  });
</script>
