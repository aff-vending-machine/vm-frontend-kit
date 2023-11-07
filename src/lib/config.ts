function removeTrailingSlash(str: string): string {
  if (str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str;
}

const baseUrl = removeTrailingSlash(import.meta.env.VITE_BASE_URL || 'http://localhost:3000');
const apiUrl = removeTrailingSlash(`${baseUrl}/${import.meta.env.VITE_API_VERSION || ''}`) + '/';

const config = {
  baseUrl,
  apiUrl,
};

export default config;

export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';
export const AUTHENTICATED_REMEMBERED = 'authenticated-remembered';
