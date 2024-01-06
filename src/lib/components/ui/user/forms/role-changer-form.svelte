<!-- UserRoleChanger -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import SelectField from '$lib/components/ui-common/forms/SelectField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import { RoleChangerForm } from './role-changer-form';
  import type { AccountUserChangeRoleEntity, AccountUserEntity } from '$lib/types/account_user';
  import type { AccountRoleEntity } from '$lib/types/account_role';

  let { user, roleOptions, onchangerole, oncancel } = $props<{
    user: AccountUserEntity;
    roleOptions: SelectOptionsType<number, AccountRoleEntity>[];
    onchangerole: (id: number, data: AccountUserChangeRoleEntity) => void;
    oncancel: () => void;
  }>();

  const form = new RoleChangerForm(user);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.valid) onchangerole(user.id, form.data);
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <SelectField
      id="role_id"
      label={$t('user.field.role')}
      bind:value={form.data.role_id}
      error={form.errors['role_id']}
      options={roleOptions.map(b => ({ label: b.label, value: b.data?.id || 0 }))}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="warning" outline {onclick}>{$t('common.button.cancel')}</Button>
  </div>
</div>
