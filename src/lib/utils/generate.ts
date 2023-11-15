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
  return e instanceof Error ? e : new Error(String(e));
}

const date = dayjs().set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21);
export const defaultForm = date.add(-1, 'day').toDate();
export const defaultTo = date.toDate();
