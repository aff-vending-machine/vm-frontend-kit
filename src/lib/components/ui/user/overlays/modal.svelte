<script lang="ts">
  import type { Snippet } from 'svelte';
  import Modal from '$lib/components/overlays/modals/Modal.svelte';

  import { PasswordChangerFormView as PasswordChanger, RoleChangerFormView as RoleChanger } from '../forms';

  type Components = {
    PasswordChanger?: typeof PasswordChanger;
    RoleChanger?: typeof RoleChanger;
  };

  let {
    title = '',
    subtitle = '',
    mode,
    onclose,
    children: grandChildren,
  } = $props<{
    title?: string;
    subtitle?: string;
    mode: string;
    onclose: () => void;
    children: Snippet<Components>;
  }>();
</script>

<Modal show={true} {onclose}>
  {#snippet children({ Header, Body })}
    <Header {title} {subtitle} {onclose} />
    <Body>
      {#if mode === 'password-changer'}
        {@render grandChildren({ PasswordChanger })}
      {:else if mode === 'role-changer'}
        {@render grandChildren({ RoleChanger })}
      {/if}
    </Body>
  {/snippet}
</Modal>
