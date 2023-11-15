import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';
import { parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/generate';
import { get } from 'svelte/store';

type FilterType = {
  from: Date;
  to: Date;
};

export const filter = useFilter<FilterType>({
  from: defaultForm,
  to: defaultTo,
});

export const bindFilter = () => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    const currentFrom = parseDate(searchParams.get('from'), defaultForm);
    const currentTo = parseDate(searchParams.get('to'), defaultTo);

    filter.update(() => ({
      from: currentFrom,
      to: currentTo,
    }));

    return p;
  });
};
