<script lang="ts">
  let {
    class: externalClass = '',
    type = 'button',
    form,
    disabled = false,
    loading = false,
    color = 'primary',
    outline = false,
    rounded = 'md',
    onclick,
  } = $props<{
    class?: string;
    type?: 'submit' | 'reset' | 'button';
    form?: string;
    disabled?: boolean;
    loading?: boolean;
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
    outline?: boolean;
    rounded?: 'sm' | 'md' | 'lg';
    onclick?: (e: MouseEvent) => void;
    children?: () => any;
  }>();

  const buttonClasses = () => {
    let classes = '';

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else if (loading) {
      classes += ' opacity-50 cursor-wait';
    } else {
      classes += outline
        ? ` bg-transparent hover:bg-${color} text-${color}`
        : ` bg-${color} hover:bg-${color}-dark text-white`;

      classes += ` hover:bg-${color}-dark hover:text-white`;
      classes += ' hover:shadow';
      classes += ` border border-${color} hover:border-${color}-dark`;
      classes += ` rounded-${rounded}`;
      classes += ` active:bg-${color}-darkest active:shadow-none`;
    }

    return classes;
  };

  const handleClick = (e: MouseEvent) => {
    if (disabled || loading) {
      return;
    }
    onclick && onclick(e);
  };
</script>

<button
  class={`
    inline-flex items-center justify-center border px-4 py-2 text-xs font-medium shadow-sm outline-none
    disabled:cursor-not-allowed disabled:opacity-50 
    ${buttonClasses()} ${externalClass || ''}
  `}
  {type}
  {form}
  disabled={disabled || loading}
  onclick={handleClick}
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
