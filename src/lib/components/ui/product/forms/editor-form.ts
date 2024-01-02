import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { CatalogProductEntity } from '$lib/types/catalog_product';

const editorSchema = z.object({
  sku: z.string().min(1),
  group_id: z.number().min(1),
  name: z.string().min(1),
  image_url: z.string(),
  price: z.number().min(0),
  is_enable: z.boolean(),
});

export type EditorFormData = z.infer<typeof editorSchema>;

export class EditorForm extends Form<EditorFormData> {
  constructor(product?: CatalogProductEntity) {
    let initialValue: EditorFormData = {
      sku: '',
      group_id: 0,
      name: '',
      image_url: '',
      price: 0,
      is_enable: false,
    };

    if (product) {
      initialValue = {
        sku: product.sku,
        group_id: product.group_id,
        name: product.name,
        image_url: product.image_url,
        price: product.sale_price,
        is_enable: product.is_enable,
      };
    }

    super(editorSchema, initialValue);
  }
}
