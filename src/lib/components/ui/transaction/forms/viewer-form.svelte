<!-- TransactionViewer -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

  let { transaction, oncancel } = $props<{
    transaction: PaymentTransactionEntity;
    oncancel: () => void;
  }>();

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{transaction.id}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-neutral-dark">{$t('transaction.field.id')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.id}</p>
        <p class="text-neutral-dark">{$t('transaction.field.branch-id')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.branch_id}</p>
      </div>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
