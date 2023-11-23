import { get, writable } from 'svelte/store';

import overlay from './overlay';

export function useSelector<M, D>() {
  type SelectorType = {
    mode: M | 'none';
    data: D | null;
  };

  const selector = writable<SelectorType>({ mode: 'none', data: null });

  function select(mode: M, data: D) {
    selector.set({ mode, data });
    overlay.open();
  }

  function ok(data: D) {
    selector.update(() => ({ mode: 'none', data }));
    overlay.close();
  }

  function reset() {
    selector.update(() => ({ mode: 'none', data: null }));
    overlay.close();
  }

  async function wait() {
    const { mode, data } = get(selector);
    if (mode !== 'none') {
      return Promise.resolve({ mode, value: data! });
    } else {
      return Promise.reject();
    }
  }

  return { select, ok, reset, wait };
}

export default useSelector;
