<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import type { AlertType } from '$lib/stores/alert';

  export let type: AlertType = 'info';
  export let message = '';

  let timeout: number;

  const dispatch = createEventDispatcher();

  const remove = () => {
    clearTimeout(timeout);
    dispatch('remove');
  };

  $: spec = getSpec(type);

  function getSpec(type: AlertType) {
    switch (type) {
      case 'info':
        return {
          icon: 'mdi:information-outline',
          bg: 'bg-primary-100',
          bar: 'bg-primary-500',
          txt: 'text-primary-700',
          color: 'blue',
        };

      case 'success':
        return {
          icon: 'mdi:check-circle-outline',
          bg: 'bg-secondary-100',
          bar: 'bg-secondary-500',
          txt: 'text-secondary-700',
          color: 'green',
        };

      case 'warning':
        return {
          icon: 'mdi:alert-decagram-outline',
          bg: 'bg-yellow-100',
          bar: 'bg-yellow-500',
          txt: 'text-yellow-700',
          color: 'yellow',
        };

      case 'error':
        return {
          icon: 'mdi:close-octagon',
          bg: 'bg-red-100',
          bar: 'bg-red-500',
          txt: 'text-red-700',
          color: 'red',
        };
    }
  }

  onMount(() => {
    timeout = window.setTimeout(() => {
      dispatch('remove');
    }, 5000);
  });

  onDestroy(() => {
    if (!timeout) {
      clearTimeout(timeout);
    }
  });
</script>

<div class="flex min-w-[16rem] animate-notify flex-col rounded-md shadow-lg {spec.bg} opacity-0">
  <div class="flex p-4 text-sm">
    <!-- <Icon icon={spec.icon} class="mr-3 h-5 w-5 flex-shrink-0" color={spec.color} /> -->
    <p class={spec.txt}>{message}</p>
    <button class="float-right ml-auto" on:click|once={remove}>
      <!-- <Icon icon="mdi:close" class="h-4 w-4 text-gray-500 hover:text-red-500" /> -->
    </button>
  </div>
  <div class="relative flex h-0.5 w-full overflow-hidden rounded-full bg-secondary-200">
    <div
      role="progressbar"
      aria-valuenow={100}
      aria-valuemin={0}
      aria-valuemax={100}
      class="flex h-full w-full animate-fill-in-5s {spec.bar}"
    />
  </div>
</div>
