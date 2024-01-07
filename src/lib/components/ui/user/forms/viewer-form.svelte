<!-- UserViewer -->
<script lang="ts">
  import { getRoleLevel } from '$lib/utils/role';
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import { profile } from '$lib/state.svelte';
  import type { AccountUserEntity } from '$lib/types/account_user';
  import { showDate } from '$lib/utils/time';

  let { user, onchangepassword, onresetpassword, onchangerole, ondelete, oncancel } = $props<{
    user: AccountUserEntity;
    onchangepassword: () => void;
    onresetpassword: (data: AccountUserEntity) => void;
    onchangerole: (data: AccountUserEntity) => void;
    ondelete: (data: AccountUserEntity) => void;
    oncancel: () => void;
  }>();

  function onChangePassword(e: MouseEvent) {
    e.preventDefault();
    onchangepassword();
  }

  function onResetPassword(e: MouseEvent) {
    e.preventDefault();
    onresetpassword(user);
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

  <div class="mt-8 flex flex-wrap-reverse justify-between">
    <div class="flex space-x-2 p-2">
      {#if user.id === profile.value?.id}
        <Button color="accent" outline onclick={onChangePassword}>{$t('common.button.change-password')}</Button>
      {:else if getRoleLevel(profile.value?.role) > 5}
        <Button color="accent" outline onclick={onResetPassword}>{$t('common.button.reset-password')}</Button>
      {/if}
      <Button color="secondary" outline onclick={onChangeRole}>{$t('common.button.change-role')}</Button>
    </div>
    <div class="flex space-x-2 p-2">
      <Button color="danger" onclick={onDelete}>{$t('common.button.delete')}</Button>
      <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
    </div>
  </div>
</div>
