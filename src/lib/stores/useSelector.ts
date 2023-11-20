import { writable } from 'svelte/store';

import overlay from './overlay';

export function useSelector<T>() {
  const { subscribe, update, set } = writable<T>();

  function select(data: T) {
    set(data);
    overlay.open();
  }

  function ok(data: T) {
    update(() => data);
    overlay.close();
  }

  function cancel() {
    overlay.close();
  }

  return { select, ok, cancel, subscribe, update, set };
}

export default useSelector;
