import dayjs from 'dayjs';

export const defaultForm = dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate();
export const defaultTo = dayjs().set('hour', 23).set('minute', 59).set('second', 59).toDate();

export const showDate = (date?: Date) => {
  if (!date) return '-';
  return dayjs(date).format('DD MMM YYYY HH:mm:ss');
};
