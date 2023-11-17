import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';

type FilterType = {
  page: number;
  limit: number;
};

export const filter = useFilter<FilterType>({
  page: 1,
  limit: 10,
});

export const bindFilter = (count: number) => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    const currentLimit = parseInt(searchParams.get('limit') ?? '10');
    const currentPage = parseInt(searchParams.get('page') ?? '1');

    const maxPage = Math.ceil(count / currentLimit);
    const params = new URLSearchParams(searchParams);

    if (currentPage > maxPage) {
      params.set('page', maxPage.toString());
      params.sort();

      await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
      return;
    }

    filter.update(() => ({
      page: currentPage,
      limit: currentLimit,
    }));

    return p;
  });
};
