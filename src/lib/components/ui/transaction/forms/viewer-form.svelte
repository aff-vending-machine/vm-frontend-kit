<!-- TransactionViewer -->
<script lang="ts">
  import dayjs from 'dayjs';
  import { t } from '$lib/i18n/translations';
  import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

  let { transaction } = $props<{
    transaction: PaymentTransactionEntity;
  }>();

  const cart = JSON.parse(transaction.raw_cart);

  function format(date?: Date) {
    if (!date) return '-';
    return dayjs(date).format('DD MMM YYYY HH:mm:ss');
  }

  function duration(from: Date, to: Date) {
    return dayjs(to).diff(from, 'second') + ' seconds';
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <div class="grid grid-cols-3 gap-4">
        <p class="text-neutral-dark">{$t('transaction.field.id')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.id}</p>
        <p class="text-neutral-dark">{$t('transaction.field.branch')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.branch?.name ?? '-'} ({transaction.branch_id})</p>
        <p class="text-neutral-dark">{$t('transaction.field.machine')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.machine?.name ?? '-'} ({transaction.machine_id})</p>
        <p class="text-neutral-dark">{$t('transaction.field.channel')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.channel?.name ?? '-'} ({transaction.channel_id})</p>
        <p class="text-neutral-dark">{$t('transaction.field.order_id')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.merchant_order_id}</p>
        <p class="text-neutral-dark">{$t('transaction.field.quantity')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.order_quantity} / {transaction.received_quantity}</p>
        <p class="text-neutral-dark">{$t('transaction.field.price')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.order_price} / {transaction.paid_price}</p>
        <p class="text-neutral-dark">{$t('transaction.field.order_status')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.order_status}</p>

        <p class="text-neutral-dark">{$t('transaction.field.cart')}:</p>
        {#each cart as item (item.name)}
          <p class="col-span-2 col-start-2 text-neutral-dark">
            {item.quantity} x {item.name} ({item.code}) = {item.quantity * item.price}
          </p>
        {/each}

        <p class="text-neutral-dark">{$t('transaction.field.reference1')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.reference1}</p>
        <p class="text-neutral-dark">{$t('transaction.field.reference2')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.reference2}</p>
        <p class="text-neutral-dark">{$t('transaction.field.reference3')}:</p>
        <p class="col-span-2 overflow-hidden text-ellipsis pr-4 text-neutral-dark">{transaction.reference3}</p>

        <p class="text-neutral-dark">{$t('transaction.field.created_at')}:</p>
        <p class="col-span-2 text-neutral-dark">{format(transaction.created_at)}</p>
        <p class="text-neutral-dark">{$t('transaction.field.updated_at')}:</p>
        <p class="col-span-2 text-neutral-dark">{format(transaction.updated_at)}</p>
        <p class="text-neutral-dark">{$t('transaction.field.ordered_at')}:</p>
        <p class="col-span-2 text-neutral-dark">{format(transaction.ordered_at)}</p>
        <p class="text-neutral-dark">{$t('transaction.field.payment_requested_at')}:</p>
        <p class="col-span-2 text-neutral-dark"><time>{format(transaction.payment_requested_at)}</time></p>

        {#if transaction.order_status === 'CANCELLED'}
          <p class="text-neutral-dark">{$t('transaction.field.cancelled_by')}:</p>
          <p class="col-span-2 text-neutral-dark">{transaction.cancelled_by}</p>
          <p class="text-neutral-dark">{$t('transaction.field.cancelled_at')}:</p>
          <p class="col-span-2 text-neutral-dark"><time>{format(transaction.cancelled_at)}</time></p>
          <p class="text-neutral-dark">{$t('transaction.field.duration')}:</p>
          <p class="col-span-2 text-neutral-dark">
            <time>{duration(transaction.ordered_at, transaction.cancelled_at!)}</time>
          </p>
        {/if}

        {#if transaction.order_status === 'DONE'}
          <p class="text-neutral-dark">{$t('transaction.field.confirmed_paid_by')}:</p>
          <p class="col-span-2 text-neutral-dark">{transaction.confirmed_paid_by}</p>
          <p class="text-neutral-dark">{$t('transaction.field.confirmed_paid_at')}:</p>
          <p class="col-span-2 text-neutral-dark"><time>{format(transaction.confirmed_paid_at)}</time></p>
          <p class="text-neutral-dark">{$t('transaction.field.received_item_at')}:</p>
          <p class="col-span-2 text-neutral-dark"><time>{format(transaction.received_item_at)}</time></p>
          <p class="text-neutral-dark">{$t('transaction.field.duration')}:</p>
          <p class="col-span-2 text-neutral-dark">
            <time>{duration(transaction.ordered_at, transaction.received_item_at!)}</time>
          </p>
        {/if}

        {#if transaction.is_error}
          <p class="text-neutral-dark">{$t('transaction.field.error')}:</p>
          <p class="col-span-2 text-neutral-dark">{transaction.error}</p>
          <p class="text-neutral-dark">{$t('transaction.field.error_at')}:</p>
          <p class="col-span-2 text-neutral-dark"><time>{format(transaction.error_at)}</time></p>
          <p class="text-neutral-dark">{$t('transaction.field.duration')}:</p>
          <p class="col-span-2 text-neutral-dark">
            <time>{duration(transaction.ordered_at, transaction.error_at!)}</time>
          </p>
        {/if}
        <p class="text-neutral-dark">{$t('transaction.field.note')}:</p>
        <p class="col-span-2 text-neutral-dark">{transaction.note}</p>
      </div>
    </div>
  </div>
</div>
