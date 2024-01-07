<!-- UserPasswordChanger -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import { PasswordChangerForm } from './password-changer-form';
  import type { AccountUserChangePasswordEntity, AccountUserEntity } from '$lib/types/account_user';

  let { onchangepassword, oncancel } = $props<{
    onchangepassword: (data: AccountUserChangePasswordEntity) => void;
    oncancel: () => void;
  }>();

  const form = new PasswordChangerForm();

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.valid) onchangepassword(form.data);
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <TextInputField
      id="old-password"
      label={$t('user.field.old-password')}
      bind:value={form.data.old_password}
      error={form.errors['old-password']}
    />

    <TextInputField
      id="new-password"
      label={$t('user.field.new-password')}
      bind:value={form.data.new_password}
      error={form.errors['new-password']}
    />

    <TextInputField
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
