import type { HttpError_1 } from '@sveltejs/kit';

/**
 * Generate a unique ID for an element
 */
export function generateId(): string {
  const timestamp = new Date().getTime().toString(36);
  const random = Math.random().toString(36).substring(2, 5); // Use a portion of the random number
  return timestamp + random;
}

/**
 * Generate a unique ID for an element
 */
export function generateError(e: unknown): Error {
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

export function generateRandomNumber(length: number = 6): string {
  const characters = '0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateKey(input: string): string {
  // Convert to lowercase
  let formatted = input.toLowerCase();

  // Replace non-alphanumeric characters with '-'
  formatted = formatted.replace(/[^a-z0-9]/g, '-');

  // Replace multiple consecutive '-' with a single '-'
  formatted = formatted.replace(/-+/g, '-');

  return formatted;
}
