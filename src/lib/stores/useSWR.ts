import { writable } from 'svelte/store';

import type { Pagination, Result } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';

// Defining a generic type for the fetcher function
type Fetcher<T> = () => Promise<Result<T>>;

export type SWRStore<T> = {
  data?: T;
  pagination?: Pagination;
  error?: Error;
  loading: boolean;
};

export function useSWR<T>() {
  const { subscribe, set, update } = writable<SWRStore<T>>({ loading: false });

  async function mutate(fetcher: Fetcher<T>): Promise<string | null> {
    try {
      set({ loading: true });
      const result = await fetcher();
      update(() => ({ loading: false, data: result.data, pagination: result.pagination }));
    } catch (e) {
      const err = generateError(e);
      update(() => ({ loading: false, error: err }));
      return err.message;
    }

    return null;
  }

  async function call(fetcher: Fetcher<void>): Promise<string | null> {
    try {
      set({ loading: true });
      await fetcher();
      update(() => ({ loading: false }));
    } catch (e) {
      const err = generateError(e);
      update(() => ({ loading: false, error: err }));
      return err.message;
    }

    return null;
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
