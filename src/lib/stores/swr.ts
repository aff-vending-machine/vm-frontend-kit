import { writable } from 'svelte/store';

export type SWRData<T> = {
  loading: boolean;
  data?: T;
  error?: string;
};

function useSWR<T>() {
  const swr = writable<SWRData<T>>({ loading: false });

  function init() {
    swr.set({ loading: true });
  }

  function success(data?: T) {
    swr.update(() => ({ loading: false, data }));
  }

  function failure(error: string | unknown) {
    swr.update(() => ({ loading: false, error: error as string }));
  }

  return { init, success, failure, ...swr };
}

export { useSWR };
