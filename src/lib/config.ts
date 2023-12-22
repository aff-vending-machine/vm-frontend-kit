function removeTrailingSlash(str?: string): string {
  if (!str) return '';
  if (str.endsWith('/')) return str.slice(0, -1);
  return str;
}

const baseUrl = removeTrailingSlash(import.meta.env.VITE_BASE_URL);
const apiUrl = removeTrailingSlash(`${baseUrl}/${import.meta.env.VITE_API_PATH || ''}`) + '/';

const config = {
  baseUrl,
  apiUrl,
  sameHost: baseUrl === '',
};

export default config;
