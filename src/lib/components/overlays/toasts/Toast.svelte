<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Toast, type ToastType } from './state.svelte';

  let { id, type, message, onclose } = $props<{
    id: string;
    type: ToastType;
    message: string;
    onclose: (id: string) => void;
  }>();

  let timeout: number;
  const toast = new Toast(type);

  function onclick(e: MouseEvent) {
    e.preventDefault();

    clearTimeout(timeout);
    onclose && onclose(id);
  }

  $effect(() => {
    timeout = window.setTimeout(() => {
      clearTimeout(timeout);
      onclose && onclose(id);
    }, 5000);

    return () => {
      if (!timeout) {
        clearTimeout(timeout);
      }
    };
  });
</script>

{#if toast.spec}
  <div class="flex min-w-[20rem] flex-col rounded-md shadow-lg {toast.spec.bg}">
    <div class="flex p-4 text-sm">
      <Icon icon={toast.spec.icon} class="mr-3 h-5 w-5 flex-shrink-0" color={toast.spec.color} />
      <p class={toast.spec.txt}>{message}</p>
      <button class="float-right ml-auto" {onclick}>
        <Icon icon="mdi:close" class="h-4 w-4 text-neutral hover:text-danger" />
      </button>
    </div>
    <div class="relative flex h-0.5 w-full overflow-hidden rounded-full bg-neutral-light">
      <div
        role="progressbar"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
        class="flex h-full w-full {toast.spec.bar}"
      />
    </div>
  </div>
{/if}
