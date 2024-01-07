<!-- UserCreator -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import SelectIDField from '$lib/components/ui-common/forms/SelectIDField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { AccountRoleEntity } from '$lib/types/account_role';
  import type { AccountUserCreateEntity } from '$lib/types/account_user';
  import type { SelectOptionsType } from '$lib/utils/options';
  import { CreatorForm } from './creator-form';
  import type { StoreBranchEntity } from '$lib/types/store_branch';
  import PasswordField from '$lib/components/ui-common/forms/PasswordField.svelte';

  let { roleOptions, branchOptions, oncreate, oncancel } = $props<{
    roleOptions: SelectOptionsType<number, AccountRoleEntity>[];
    branchOptions: SelectOptionsType<number, StoreBranchEntity>[];
    oncreate: (data: AccountUserCreateEntity) => void;
    oncancel: () => void;
  }>();

  const form = new CreatorForm();

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.valid) oncreate(form.data);
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <TextInputField
      id="username"
      label={$t('user.field.username')}
      bind:value={form.data.username}
      error={form.errors['username']}
    />

    <SelectIDField
      id="role_id"
      label={$t('user.field.role')}
      bind:value={form.data.role_id}
      error={form.errors['role_id']}
      options={roleOptions.map(b => ({ label: b.label, value: b.data?.id || 0 }))}
    />

    <SelectIDField
      id="branch_id"
      label={$t('user.field.branch')}
      bind:value={form.data.branch_id}
      error={form.errors['branch_id']}
      options={branchOptions.map(b => ({ label: b.label, value: b.data?.id || 0 }))}
      unselected={0}
      placeholder={$t('user.all-branches')}
    />

    <PasswordField
      id="password"
      label={$t('user.field.password')}
      bind:value={form.data.password}
      error={form.errors['password']}
    />

    <PasswordField
      id="confirm-password"
      label={$t('user.field.confirm-password')}
      bind:value={form.data.confirm_password}
      error={form.errors['confirm-password']}
    />

    {#if form.errors['confirm']}
      <p class="m-2 text-xs text-danger">{form.errors['confirm']}</p>
    {/if}
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="warning" outline {onclick}>{$t('common.button.cancel')}</Button>
  </div>
</div>
