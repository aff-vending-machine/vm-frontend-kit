import { page } from '$app/stores';
import { writable } from 'svelte/store';

export type FilterUpdate<T> = (filter: T, params: URLSearchParams) => T;

export function useFilter<T>(init: T, updater: FilterUpdate<T>) {
  const filter = writable<T>(init);

  const reload = (updater: FilterUpdate<T>) => {
    const unsubscribe = page.subscribe(p => {
      filter.update(f => updater(f, p.url.searchParams));
    });

    return unsubscribe;
  };

  const mutate = () => {
    const unsubscribe = reload(updater);
    return () => unsubscribe();
  };

  return {
    ...filter,
    mutate,
  };
}

export default useFilter;
