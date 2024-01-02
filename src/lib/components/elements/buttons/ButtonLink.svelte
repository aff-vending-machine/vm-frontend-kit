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
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
    outline?: boolean;
    rounded?: 'sm' | 'md' | 'lg';
    children?: () => any;
  }>();

  const buttonClasses = () => {
    let classes = outline
      ? ` bg-transparent hover:bg-${color} text-${color} `
      : ` bg-${color} hover:bg-${color}-light text-white`;

    classes += ` hover:bg-${color}-light hover:text-white`;
    classes += ' hover:shadow';
    classes += ` border border-${color} hover:border-${color}-light`;
    classes += ` rounded-${rounded}`;
    classes += ` active:bg-${color}-darkest active:shadow-none`;

    return classes;
  };
</script>

<a
  class={`
    inline-flex items-center justify-center border px-4 py-2 text-xs font-medium shadow-sm outline-none
    ${buttonClasses()} ${externalClass || ''}
  `}
  {href}
  {target}
>
  <slot />
</a>
