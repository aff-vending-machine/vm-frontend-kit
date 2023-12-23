<script lang="ts">
  let {
    class: externalClass = '',
    href,
    target,
    color = 'primary',
    outline = false,
    rounded = 'md',
  } = $props<{
    class?: string;
    href: string;
    target?: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'info' | 'warning' | 'success' | 'danger';
    outline?: boolean;
    rounded?: 'sm' | 'md' | 'lg';
    children?: () => any;
  }>();

  const buttonClasses = () => {
    let classes = outline
      ? ` bg-transparent hover:bg-${color}-500 text-${color}-500 `
      : ` bg-${color}-500 hover:bg-${color}-700 text-white`;

    classes += ` hover:bg-${color}-700 hover:text-white`;
    classes += ' hover:shadow';
    classes += ` border border-${color}-500 hover:border-${color}-700`;
    classes += ` rounded-${rounded}`;
    classes += ` active:bg-${color}-800 active:shadow-none`;

    return classes;
  };
</script>

<a
  class={`
    inline-flex items-center justify-center border px-4 py-2 text-xs font-medium shadow-sm outline-none
    disabled:cursor-not-allowed disabled:opacity-50 
    ${buttonClasses()} ${externalClass || ''}
  `}
  {href}
  {target}
>
  <slot />
</a>
