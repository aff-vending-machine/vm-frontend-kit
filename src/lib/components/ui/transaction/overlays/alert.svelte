<script lang="ts">
  import { salert } from '$lib/salert';
  import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

  let { mode, transaction, ondone, oncancel, onclose } = $props<{
    mode: string;
    transaction: PaymentTransactionEntity;
    ondone: (id: number, reason: string) => void;
    oncancel: (id: number, reason: string) => void;
    onclose: () => void;
  }>();

  $effect(() => {
    // prevent lost id on close
    const ts = setTimeout(async () => {
      const id = transaction.id;
      const note = await salert.note(mode.toUpperCase());

      if (!!note) {
        if (mode === 'done') {
          ondone(id, note);
        } else if (mode === 'cancel') {
          oncancel(id, note);
        }
      }

      onclose();
    }, 100);

    return () => {
      clearTimeout(ts);
    };
  });
</script>
