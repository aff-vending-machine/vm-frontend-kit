import { z } from 'zod';

import { Form } from '$lib/hooks/form.svelte';
import type { AccountUserEntity } from '$lib/types/account_user';

const roleChangerSchema = z.object({
  role_id: z.number().min(1),
});

export type RoleChangerFormData = z.infer<typeof roleChangerSchema>;

export class RoleChangerForm extends Form<RoleChangerFormData> {
  constructor(user: AccountUserEntity) {
    const initialValue: RoleChangerFormData = {
      role_id: user.role_id,
    };

    super(roleChangerSchema, initialValue);
  }
}
