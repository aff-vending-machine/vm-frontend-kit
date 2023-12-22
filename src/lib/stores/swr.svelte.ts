import { generateError } from '$lib/helpers/generator';

// Defining a generic type for the fetcher function
type Fetcher<T> = () => Promise<T>;

export function createSWR<T>() {
  let data = $state<T>();
  let loading = $state(false);
  let error = $state<Error>();
  const value = $derived({ data, loading, error });

  async function mutate(fetcher: Fetcher<T>) {
    loading = true;
    error = undefined;

    try {
      data = await fetcher();
    } catch (e) {
      error = generateError(e);
    } finally {
      loading = false;
    }
  }

  return {
    get value() {
      return value;
    },
    mutate,
  };
}
