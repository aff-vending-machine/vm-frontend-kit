function removeTrailingSlash(str?: string): string {
  if (!str) return '';
  if (str.endsWith('/')) return str.slice(0, -1);
  return str;
}

const baseUrl = removeTrailingSlash(import.meta.env.VITE_BASE_URL);
const apiPath = removeTrailingSlash(import.meta.env.VITE_API_PATH) || 'api';
const apiUrl = removeTrailingSlash(`${baseUrl}/${apiPath}`) + '/';

const config = {
  baseUrl,
  apiUrl,
  apiPath,
  sameHost: baseUrl === '',
};

export default config;
