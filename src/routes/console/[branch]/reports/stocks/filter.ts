import useFilter from '$lib/stores/useFilter';
import dayjs from 'dayjs';

type FilterType = {
  id: number;
  machineId: number;
  group: boolean;
  from: Date;
  to: Date;
};

const date = dayjs().set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21);
export const defaultForm = date.subtract(1, 'day').toDate();
export const defaultTo = date.toDate();

export const filter = useFilter<FilterType>({
  id: 0,
  machineId: 0,
  group: true,
  from: defaultForm,
  to: defaultTo,
});
