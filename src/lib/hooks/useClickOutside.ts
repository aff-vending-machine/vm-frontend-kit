/** Dispatch event on click outside of node */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const clickOutside = (node: any) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click-outside', node));
    }
  };

  document.addEventListener('click', handleClick, true);
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
};
