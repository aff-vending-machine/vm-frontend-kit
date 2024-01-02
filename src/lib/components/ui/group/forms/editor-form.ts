import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { CatalogGroupEntity } from '$lib/types/catalog_group';

const editorSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  is_enable: z.boolean(),
});

export type EditorFormData = z.infer<typeof editorSchema>;

export class EditorForm extends Form<EditorFormData> {
  constructor(group?: CatalogGroupEntity) {
    let initialValue: EditorFormData = {
      name: '',
      description: '',
      is_enable: false,
    };

    if (group) {
      initialValue = {
        name: group.name,
        description: group.description,
        is_enable: group.is_enable,
      };
    }

    super(editorSchema, initialValue);
  }
}
