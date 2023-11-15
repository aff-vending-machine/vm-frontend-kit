import { writable } from 'svelte/store';

export type FilterUpdate<T> = (filter: T, params: URLSearchParams) => T;

export function useFilter<T>(init: T) {
  const { subscribe, update, set } = writable<T>(init);

  return { subscribe, update, set };
}

export default useFilter;
