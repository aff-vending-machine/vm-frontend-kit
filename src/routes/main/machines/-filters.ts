import { goto } from '$app/navigation';
import { debounce } from '$lib/utils/debounce';
import { writable } from 'svelte/store';

// Define your store
export const filters = writable({
  limit: '10',
  offset: '0',
  title: '',
  sort: 'asc',
});

// Function to update the URL with debounce
export const updateURL = (filters: Record<string, string>) => {
  const filtersWithoutNull = clearNulls(filters);
  const searchParams = new URLSearchParams(filtersWithoutNull).toString();

  debounce(() => {
    const url = `?${searchParams}`;
    goto(url, { replaceState: true, keepFocus: true });
  }, 500)();
};

function clearNulls(record: Record<string, string | null>): Record<string, string> {
  Object.keys(record).forEach(key => {
    if (record[key] === null) {
      delete record[key];
    }
  });
  return record as Record<string, string>;
}
