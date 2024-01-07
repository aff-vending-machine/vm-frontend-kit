<!-- UserViewer -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { AccountUserEntity } from '$lib/types/account_user';
  import { showDate } from '$lib/utils/time';

  let { user, onchangepassword, onchangerole, ondelete, oncancel } = $props<{
    user: AccountUserEntity;
    onchangepassword: () => void;
    onchangerole: (data: AccountUserEntity) => void;
    ondelete: (data: AccountUserEntity) => void;
    oncancel: () => void;
  }>();

  function onChangePassword(e: MouseEvent) {
    e.preventDefault();
    onchangepassword();
  }

  function onChangeRole(e: MouseEvent) {
    e.preventDefault();
    onchangerole(user);
  }

  function onDelete(e: MouseEvent) {
    e.preventDefault();
    ondelete(user);
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{user.username}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-neutral-dark">{$t('user.field.id')}:</p>
        <p class="col-span-2 text-neutral-dark">{user.id}</p>
        <p class="text-neutral-dark">{$t('user.field.branch')}:</p>
        <p class="col-span-2 text-neutral-dark">{user.branch?.name ?? $t('user.all-branches')}</p>
        <p class="text-neutral-dark">{$t('user.field.role')}:</p>
        <p class="col-span-2 text-neutral-dark">{user.role?.name}</p>
        <p class="text-neutral-dark">{$t('user.field.last-login')}:</p>
        <p class="col-span-2 text-neutral-dark">{showDate(user.last_login)}</p>
      </div>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" onclick={onChangePassword}>{$t('common.button.change-password')}</Button>
    <Button color="secondary" onclick={onChangeRole}>{$t('common.button.change-role')}</Button>
    <Button color="danger" onclick={onDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
