import useFilter from '$lib/stores/useFilter';
import { toDate } from '$lib/utils/convert';
import dayjs from 'dayjs';

type FilterType = {
  id: number;
  channel_id: number;
  from: Date;
  to: Date;
};

const date = dayjs().set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21);
export const defaultForm = date.subtract(1, 'day').toDate();
export const defaultTo = date.toDate();

const updater = (f: FilterType, params: URLSearchParams) => {
  return {
    id: parseInt(params.get('id') ?? '0') ?? f.id,
    channel_id: parseInt(params.get('channel_id') ?? '0') ?? f.channel_id,
    from: toDate(params.get('from'), defaultForm),
    to: toDate(params.get('to'), defaultTo),
  };
};

export const filter = useFilter<FilterType>(
  {
    id: 0,
    channel_id: 0,
    from: defaultForm,
    to: defaultTo,
  },
  updater,
);
