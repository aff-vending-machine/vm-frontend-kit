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
  const swr = writable<SWRStore<T>>({ loading: false });

  async function mutate(fetcher: Fetcher<T>) {
    try {
      swr.set({ loading: true });
      const result = await fetcher();
      swr.update(() => ({ loading: false, data: result }));
    } catch (e) {
      const err = genError(e);
      swr.update(() => ({ loading: false, error: err }));
    }
  }

  async function failure(message: string) {
    swr.update(() => ({ loading: false, error: new Error(message) }));
  }

  return {
    ...swr,
    mutate,
    failure,
  };
}

export default useSWR;
