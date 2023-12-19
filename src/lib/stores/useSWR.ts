import { writable } from 'svelte/store';

import { genError } from '$lib/utils/generate';

// Defining a generic type for the fetcher function
type Fetcher<T> = () => Promise<T>;

export type SWRStore<T> = {
  data?: T;
  error?: Error;
  loading: boolean;
};

export function useSWR<T>() {
  const { subscribe, set, update } = writable<SWRStore<T>>({ loading: false });

  async function mutate(fetcher: Fetcher<T>): Promise<string | null> {
    try {
      set({ loading: true });
      const result = await fetcher();
      update(() => ({ loading: false, data: result }));
    } catch (e) {
      const err = genError(e);
      update(() => ({ loading: false, error: err }));
      return err.message;
    }

    return null;
  }

  async function call(fetcher: Fetcher<void>) {
    try {
      set({ loading: true });
      await fetcher();
      update(() => ({ loading: false }));
    } catch (e) {
      const err = genError(e);
      update(() => ({ loading: false, error: err }));
    }
  }

  async function failure(message: string) {
    update(() => ({ loading: false, error: new Error(message) }));
  }

  return {
    subscribe,
    set,
    update,
    call,
    mutate,
    failure,
  };
}

export default useSWR;
