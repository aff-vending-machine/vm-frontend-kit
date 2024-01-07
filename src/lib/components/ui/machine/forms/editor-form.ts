import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { MachineEntity } from '$lib/types/machine';

const editorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  branch_id: z.number().min(1, 'Branch is required'),
  location: z.string(),
  type: z.string(),
  vendor: z.string(),
  status: z.string(),
});

export type EditorFormData = z.infer<typeof editorSchema>;

export class EditorForm extends Form<EditorFormData> {
  constructor(machine?: MachineEntity) {
    let initialValue: EditorFormData = {
      name: '',
      branch_id: 0,
      location: '',
      type: '',
      vendor: '',
      status: '',
    };

    if (machine) {
      initialValue = {
        name: machine.name,
        branch_id: machine.branch_id,
        location: machine.location,
        type: machine.type,
        vendor: machine.vendor,
        status: machine.status,
      };
    }

    super(editorSchema, initialValue);
  }
}
