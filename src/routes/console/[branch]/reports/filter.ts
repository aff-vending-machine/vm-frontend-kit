import useFilter from '$lib/stores/useFilter';
import dayjs from 'dayjs';

type FilterType = {
  from: string;
  to: string;
};

const date = dayjs().set('second', 0).set('minute', 0).set('hour', 21);
export const defaultForm = date.add(-1, 'day').toISOString();
export const defaultTo = date.toISOString();

const updater = (_: FilterType, params: URLSearchParams) => ({
  from: params.get('from') ?? defaultForm,
  to: params.get('to') ?? defaultTo,
});

export const filter = useFilter<FilterType>(
  {
    from: '',
    to: '',
  },
  updater,
);
