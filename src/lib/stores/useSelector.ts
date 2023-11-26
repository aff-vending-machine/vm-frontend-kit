import { writable } from 'svelte/store';

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

  async function call({ mode, data }: SelectorType) {
    if (mode !== 'none' && !!data) {
      return Promise.resolve({ mode, value: data! });
    }
    return Promise.reject();
  }

  return { select, ok, reset, call, ...selector };
}

export default useSelector;
