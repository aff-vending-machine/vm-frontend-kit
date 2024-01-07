import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { CatalogProductEntity } from '$lib/types/catalog_product';

const editorSchema = z.object({
  group_id: z.number().min(1),
  name: z.string().min(1),
  barcode: z.string(),
  description: z.string(),
  image_url: z.string(),
  price: z.number().min(0),
  is_enable: z.boolean(),
});

export type EditorFormData = z.infer<typeof editorSchema>;

export class EditorForm extends Form<EditorFormData> {
  constructor(product?: CatalogProductEntity) {
    let initialValue: EditorFormData = {
      group_id: 0,
      name: '',
      barcode: '',
      description: '',
      image_url: '',
      price: 0,
      is_enable: false,
    };

    if (product) {
      initialValue = {
        group_id: product.group_id,
        name: product.name,
        barcode: product.barcode,
        description: product.description,
        image_url: product.image_url,
        price: product.sale_price,
        is_enable: product.is_enable,
      };
    }

    super(editorSchema, initialValue);
  }
}
