import type { TokenData } from '$lib/stores/access';

const parseTokenData = (token: TokenData) => {
  token.iat = convertToDate(token.iat);
  token.exp = convertToDate(token.exp);

  return token;
};

const convertToDate = (date: Date | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'number') return new Date(date * 1000);
  if (typeof date === 'string') return new Date(parseInt(date) * 1000);
  return new Date(date);
};

export const parseJWT = (token: string): TokenData => {
  if (!token && token.indexOf('.') < 0) {
    throw new Error('Invalid JWT token');
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  const tokenData = JSON.parse(jsonPayload) as TokenData;
  return parseTokenData(tokenData);
};
