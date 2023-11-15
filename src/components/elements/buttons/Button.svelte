<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: 'submit' | 'reset' | 'button' = 'button';
  export let form: string | undefined = undefined;
  export let disabled = false;
  export let loading = false;
  export let color: 'primary' | 'secondary' | 'tertiary' | 'info' | 'warning' | 'success' | 'danger' = 'primary';
  export let outline = false;
  export let rounded = 'md';

  const dispatch = createEventDispatcher();

  const buttonClasses = () => {
    let classes = '';

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else if (loading) {
      classes += ' opacity-50 cursor-wait';
    } else {
      classes += outline
        ? ` bg-transparent hover:bg-${color}-500 text-${color}-500 `
        : ` bg-${color}-500 hover:bg-${color}-700 text-white`;

      classes += ` hover:bg-${color}-700 hover:text-white`;
      classes += ' hover:shadow';
      classes += ` border border-${color}-500 hover:border-${color}-700`;
      classes += ` rounded-${rounded}`;
      classes += ` active:bg-${color}-800 active:shadow-none`;
    }

    return classes;
  };

  const handleClick = () => {
    if (disabled || loading) {
      return;
    }

    // Call the click handler if it was passed in as a prop
    dispatch('click');
  };
</script>

<button
  class={`
    inline-flex items-center justify-center border px-4 py-2 text-xs font-medium shadow-sm outline-none
    disabled:cursor-not-allowed disabled:opacity-50 
    ${buttonClasses()} ${$$props.class || ''}
  `}
  {type}
  {form}
  disabled={disabled || loading}
  on:click|stopPropagation={handleClick}
>
  {#if loading}
    <svg
      class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  {/if}

  <slot />
</button>
