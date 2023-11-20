import { writable } from 'svelte/store';

export function useFilter<T>(init: T) {
  const { subscribe, update, set } = writable<T>(init);

  return { subscribe, update, set };
}

export default useFilter;
