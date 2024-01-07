<script lang="ts">
  import Icon from '@iconify/svelte';

  let { title, subtitle, onclose } = $props<{
    title?: string;
    subtitle?: string;
    onclose?: () => void;
  }>();

  function onclick(e: MouseEvent) {
    e.preventDefault();
    onclose && onclose();
  }
</script>

<div class="flex w-full items-center border-b border-neutral-light bg-neutral-light p-6">
  <button class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-center" {onclick}>
    <Icon icon="mdi:close" class="h-5 w-5 hover:text-danger" />
  </button>
  <div class="flex flex-1 flex-col">
    <h2 class="text-xl"><strong>{title}</strong></h2>
    <small class="text-md">{subtitle}</small>
  </div>
</div>
