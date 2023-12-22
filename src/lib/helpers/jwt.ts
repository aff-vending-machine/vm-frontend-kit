import { isTokenExpired } from './checker';
import { generateError } from './generator';
import { storage } from './local-storage';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '$lib/constants';
import api from '$lib/helpers/apis/api';
import type { AuthResult } from '$lib/types/auth';

export const getAccessTokenWithAuthRefresh = async (): Promise<string> => {
  const accessToken = storage(ACCESS_TOKEN);

  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshToken = storage(REFRESH_TOKEN);

    if (!refreshToken || isTokenExpired(refreshToken)) {
      throw generateError('No valid token available');
    }

    try {
      const result = await api.post<AuthResult>('auth/refresh', { refresh_token: refreshToken });
      storage(ACCESS_TOKEN, result.data!.access_token);
      storage(REFRESH_TOKEN, result.data!.refresh_token);
      return result.data!.access_token;
    } catch (e) {
      throw generateError(e);
    }
  }

  return accessToken;
};
