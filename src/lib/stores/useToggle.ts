import { writable } from 'svelte/store';

import { debounce } from '$lib/helpers/debounce';

export function createToggleStore(default_?: boolean) {
  const delay = 100;
  const { subscribe, set, update } = writable<boolean>(default_);

  function toggle() {
    debounce(() => update(s => !s), delay)();
  }

  function enable() {
    debounce(() => set(true), delay)();
  }

  function disable() {
    debounce(() => set(false), delay)();
  }

  return {
    subscribe,
    toggle,
    enable,
    disable,
  };
}
