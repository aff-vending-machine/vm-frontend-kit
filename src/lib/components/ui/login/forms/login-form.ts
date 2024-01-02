import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  remember: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export class LoginForm extends Form<LoginFormData> {
  constructor() {
    const initialValue: LoginFormData = {
      username: '',
      password: '',
      remember: true,
    };

    super(loginSchema, initialValue);
  }
}
