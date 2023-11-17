import { type Writable, writable } from 'svelte/store';

export const windowWidth: Writable<number> = writable(0);

export const isMobile = writable(false);
export const isTablet = writable(false);
export const isDesktop = writable(false);

windowWidth.subscribe(w => {
  isMobile.set(w <= 640); // xs
  isTablet.set(w > 640 && w < 1280); // sm, md, lg
  isDesktop.set(w > 1280); // xl
});
