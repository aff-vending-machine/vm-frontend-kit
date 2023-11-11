export function genKey(input: string): string {
  // Convert to lowercase
  let formatted = input.toLowerCase();

  // Replace non-alphanumeric characters with '-'
  formatted = formatted.replace(/[^a-z0-9]/g, '-');

  // Replace multiple consecutive '-' with a single '-'
  formatted = formatted.replace(/-+/g, '-');

  return formatted;
}
