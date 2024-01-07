import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';

const passwordChangerSchema = z
  .object({
    old_password: z.string().min(1),
    new_password: z.string().min(6),
    confirm_password: z.string(),
  })
  .refine(data => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export type PasswordChangerFormData = z.infer<typeof passwordChangerSchema>;

export class PasswordChangerForm extends Form<PasswordChangerFormData> {
  constructor() {
    const initialValue: PasswordChangerFormData = {
      old_password: '',
      new_password: '',
      confirm_password: '',
    };

    super(passwordChangerSchema, initialValue);
  }
}
