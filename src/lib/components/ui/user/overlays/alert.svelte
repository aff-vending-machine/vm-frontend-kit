<script lang="ts">
  import { salert } from '$lib/salert';
  import type { AccountUserEntity } from '$lib/types/account_user';

  let { mode, user, ondelete, onclose } = $props<{
    mode: string;
    user: AccountUserEntity;
    ondelete: (id: number) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const id = user.id;
    if (mode === 'eraser') {
      salert.delete(`Are you sure to delete ${user.username} ?`, () => ondelete(id));
    }
    onclose();
  });
</script>
