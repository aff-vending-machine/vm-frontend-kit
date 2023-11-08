import api from '$lib/api';
import { ACCESS_TOKEN, REFRESH_TOKEN, AUTHENTICATED_REMEMBERED, REFRESH_TOKEN_PATH } from '$lib/constants';
import type { TokenData } from '$lib/stores/access';
import type { HttpError_1 } from '@sveltejs/kit';
import { isExpired } from './check';
import { storage } from './local-storage';

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

export const getAccessToken = async (): Promise<string> => {
  try {
    const accessToken = storage(ACCESS_TOKEN);
    const refreshToken = storage(REFRESH_TOKEN);
    if (!accessToken) {
      return Promise.reject('no access token');
    }
    let token = accessToken;
    let result = parseJWT(accessToken);

    if (isExpired(result.iat, result.exp)) {
      if (!refreshToken) {
        return Promise.reject('access token is expired');
      }
      result = parseJWT(refreshToken);

      if (isExpired(result.iat, result.exp)) {
        return Promise.reject('access & refresh token is expired');
      }

      const data = await api.post(REFRESH_TOKEN_PATH, refreshToken);

      storage(ACCESS_TOKEN, data.access_token);
      storage(REFRESH_TOKEN, data.refresh_token);
      token = data.access_token;
    }

    return Promise.resolve(token);
  } catch (e: unknown) {
    storage(ACCESS_TOKEN, null);
    storage(REFRESH_TOKEN, null);
    storage(AUTHENTICATED_REMEMBERED, null);

    const err = e as HttpError_1;
    return Promise.reject(err.body.message);
  }
};
