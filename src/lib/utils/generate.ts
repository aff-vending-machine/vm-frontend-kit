import type { HttpError_1 } from '@sveltejs/kit';
import dayjs from 'dayjs';

export function genKey(input: string): string {
  // Convert to lowercase
  let formatted = input.toLowerCase();

  // Replace non-alphanumeric characters with '-'
  formatted = formatted.replace(/[^a-z0-9]/g, '-');

  // Replace multiple consecutive '-' with a single '-'
  formatted = formatted.replace(/-+/g, '-');

  return formatted;
}

export function genError(e: unknown): Error {
  // Ensure that the caught object is an instance of Error
  if (!e) return new Error('unexpected error');
  if (e instanceof Error) return e;

  let response;

  switch (typeof e) {
    case 'object':
      response = e as HttpError_1;
      return new Error(response.body.message);

    case 'string':
      return new Error(e);
    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
      return new Error(String(e));
    case 'function':
      return new Error(e());

    default:
      return new Error('unexpected error type');
  }
}

export function clone<T>(a?: T[]): T[] {
  return a?.map(o => ({ ...o })) || [];
}

const date = dayjs().set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21);

export const defaultForm = date.add(-1, 'day').toDate();
export const defaultTo = date.toDate();

export const showDate = (date?: Date) => {
  if (!date) return '-';
  return dayjs(date).format('DD MMM YYYY HH:mm:ss');
};
