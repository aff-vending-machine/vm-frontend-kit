import { goto } from '$app/navigation';
import { writable } from 'svelte/store';

export type FilterType = {
  limit: number;
  offset: number;
  branch_id?: number;
  sort?: string;
};

export const filters = writable<FilterType>({
  limit: 10,
  offset: 0,
});

// Function to update the URL with debounce
export const updateURL = (filters: Record<string, string | number>) => {
  const filtersWithoutNull = cleanup(filters);
  const searchParams = new URLSearchParams(filtersWithoutNull).toString();

  // debounce(() => {
  const url = `?${searchParams}`;
  goto(url, { replaceState: true, keepFocus: true });
  // }, 500)();
};

function cleanup(record: Record<string, string | number | null>): Record<string, string> {
  const result: Record<string, string> = {};
  Object.keys(record).forEach(key => {
    if (record[key]) {
      result[key] = record[key]!.toString();
    }
  });

  return result;
}
