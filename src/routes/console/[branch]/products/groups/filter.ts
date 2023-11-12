import useFilter from '$lib/stores/useFilter';

type FilterType = {
  limit: number;
  offset: number;
};

const updater = (_: FilterType, params: URLSearchParams) => ({
  limit: parseInt(params.get('limit') ?? '10'),
  offset: parseInt(params.get('offset') ?? '0'),
});

export const filter = useFilter<FilterType>(
  {
    limit: 10,
    offset: 0,
  },
  updater,
);
