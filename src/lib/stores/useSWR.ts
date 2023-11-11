import { writable } from 'svelte/store';

// Defining a generic type for the fetcher function
type Fetcher<T> = () => Promise<T>;

export type SWRStore<T> = {
  data?: T;
  error?: Error;
  loading: boolean;
};

export function useSWR<T>() {
  const swr = writable<SWRStore<T>>({ loading: false });
  // const data = writable<T | undefined>(undefined);
  // const loading = writable<boolean>(false);
  // const error = writable<Error | undefined>(undefined);

  // Derive loading state based on data and error
  // const loading = derived([data, error], ([$data, $error]) => $data === undefined && $error === undefined);

  async function mutate(fetcher: Fetcher<T>) {
    try {
      swr.set({ loading: true });
      const result = await fetcher();
      swr.update(() => ({ loading: false, data: result }));
    } catch (e) {
      // Ensure that the caught object is an instance of Error
      const err = e instanceof Error ? e : new Error(String(e));
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
