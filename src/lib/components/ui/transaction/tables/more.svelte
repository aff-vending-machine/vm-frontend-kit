<script lang="ts">
  import Icon from '@iconify/svelte';

  import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';
  import Button from '$lib/components/elements/buttons/Button.svelte';

  let { source, onaction } = $props<{
    index: number;
    source: PaymentTransactionEntity;
    onaction: (mode: 'done' | 'cancel', source: PaymentTransactionEntity) => void;
  }>();

  function onAction(mode: 'done' | 'cancel') {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onaction(mode, source);
    };
  }
</script>

{#if source.order_status === 'REQUEST_ACTION'}
  <div class="flex justify-center space-x-1">
    <Button color="success" onclick={onAction('done')}>
      <Icon icon="mdi:check" class="h-4 w-4 text-white hover:text-primary" />
    </Button>
    <Button color="danger" onclick={onAction('cancel')}>
      <Icon icon="mdi:cancel" class="h-4 w-4 text-white hover:text-primary" />
    </Button>
  </div>
{/if}
