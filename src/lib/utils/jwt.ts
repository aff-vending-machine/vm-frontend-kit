import type { HttpError_1 } from '@sveltejs/kit';

import { isExpired } from './check';
import { convertToDate } from './convert';
import { storage } from './local-storage';

import api from '$lib/api';
import { ACCESS_TOKEN, AUTHENTICATED_REMEMBERED, REFRESH_TOKEN, REFRESH_TOKEN_PATH } from '$lib/constants';
import type { AccessStore } from '$types/access';

export const parseJWT = (token: string): AccessStore => {
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

  const tokenData = JSON.parse(jsonPayload) as AccessStore;
  tokenData.iat = convertToDate(tokenData.iat);
  tokenData.exp = convertToDate(tokenData.exp);

  return tokenData;
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
