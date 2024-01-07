<script lang="ts">
  import Button from './partials/Button.svelte';
  import Checkbox from './partials/Checkbox.svelte';
  import Input from './partials/Input.svelte';
  import { t } from '$lib/i18n/translations';
  import { LoginForm, type LoginFormData } from './login-form';

  let { disabled, error, onlogin } = $props<{
    error?: string;
    disabled?: boolean;
    onlogin: (data: LoginFormData) => void;
  }>();

  const form = new LoginForm();

  function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.valid) onlogin(form.data);
  }
</script>

<form id={form.id} class="my-4 flex flex-col space-y-4" {onsubmit}>
  <Input label={$t('auth.username')} type="text" bind:value={form.data.username} {disabled} />
  <Input label={$t('auth.password')} type="password" bind:value={form.data.password} {disabled} />
  <Checkbox label={$t('auth.remember')} bind:checked={form.data.remember} {disabled} />
  <hr class="m-4 pb-4 text-neutral-light" />
  {#if error}
    <span class="text-center text-sm text-danger">{error}</span>
  {/if}
  <Button form={form.id} disabled={form.invalid}>{$t('auth.signin')}</Button>
</form>
