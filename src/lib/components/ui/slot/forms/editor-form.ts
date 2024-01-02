import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { MachineSlotEntity } from '$lib/types/machine_slot';

const editorSchema = z.object({
  code: z.string().min(1),
  group_id: z.number().min(1),
  product_id: z.number().min(1),
  stock: z.number().min(1),
  capacity: z.number().min(1),
  is_enable: z.boolean(),
});

export type EditorFormData = z.infer<typeof editorSchema>;

export class EditorForm extends Form<EditorFormData> {
  constructor(slot?: MachineSlotEntity) {
    let initialValue: EditorFormData = {
      code: '',
      group_id: 0,
      product_id: 0,
      stock: 0,
      capacity: 0,
      is_enable: false,
    };

    if (slot) {
      initialValue = {
        code: slot.code,
        group_id: slot.product!.group_id,
        product_id: slot.product_id,
        stock: slot.stock,
        capacity: slot.capacity,
        is_enable: slot.is_enable,
      };
    }

    super(editorSchema, initialValue);
  }
}
