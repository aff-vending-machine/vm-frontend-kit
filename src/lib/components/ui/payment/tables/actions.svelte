<script lang="ts">
  import Icon from '@iconify/svelte';

  import type { PaymentEntity } from '$lib/types/payment';

  let { source, onaction } = $props<{
    index: number;
    source: PaymentEntity;
    onaction: (mode: 'viewer' | 'editor' | 'eraser', source: PaymentEntity) => void;
  }>();

  function onAction(mode: 'viewer' | 'editor' | 'eraser') {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onaction(mode, source);
    };
  }
</script>

<div class="flex justify-center space-x-1">
  <button onclick={onAction('viewer')}>
    <Icon icon="mdi:search" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
  <button onclick={onAction('editor')}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
  <button onclick={onAction('eraser')}>
    <Icon icon="mdi:delete" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
</div>
