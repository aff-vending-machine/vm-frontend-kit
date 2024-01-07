import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';

const creatorSchema = z
  .object({
    username: z.string().min(1),
    role_id: z.number().min(1),
    password: z.string().min(6),
    confirm_password: z.string(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export type CreatorFormData = z.infer<typeof creatorSchema>;

export class CreatorForm extends Form<CreatorFormData> {
  constructor() {
    const initialValue: CreatorFormData = {
      username: '',
      role_id: 4,
      password: '',
      confirm_password: '',
    };

    super(creatorSchema, initialValue);
  }
}
