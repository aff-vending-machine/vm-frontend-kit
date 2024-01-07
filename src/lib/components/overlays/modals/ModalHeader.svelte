<script lang="ts">
  import Icon from '@iconify/svelte';

  let { title, subtitle, onclose } = $props<{
    title: string;
    subtitle: string;
    onclose: () => void;
  }>();
</script>

<div class="flex w-full items-center">
  <div class="flex flex-1 flex-col border-b-2 border-neutral-light pb-4">
    <h2 class="text-xl"><strong>{title}</strong></h2>
    <small class="text-md">{subtitle}</small>
  </div>
  <button class="absolute right-4 top-4 flex items-center justify-center text-danger" onclick={onclose}>
    <Icon icon="mdi:close" class="h-5 w-5 hover:text-danger-dark" />
  </button>
</div>
