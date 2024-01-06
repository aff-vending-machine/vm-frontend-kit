<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

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
    children,
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
    children: Snippet;
  }>();

  const buttonClasses = () => {
    let classes = '';

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else if (loading) {
      classes += ' opacity-50 cursor-wait';
    } else {
      classes += outline
        ? ` bg-transparent text-${color} hover:bg-${color} hover:text-white`
        : ` bg-${color} text-white hover:bg-${color}-dark hover:text-white`;

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
  class="
    inline-flex items-center justify-center border px-4 py-2 text-xs font-medium shadow-sm outline-none
    disabled:cursor-not-allowed disabled:opacity-50
    {buttonClasses()} {externalClass || ''}"
  {type}
  {form}
  disabled={disabled || loading}
  onclick={handleClick}
>
  {#if loading}
    <Icon icon="eos-icons:bubble-loading" class="mr-2 h-4 w-4 text-accent" />
  {/if}
  {@render children()}
</button>
