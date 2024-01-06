import { isTokenExpired } from '../checker';
import { generateError } from '../generator';

import api from '$lib/helpers/apis/api';
import { Persisted } from '$lib/hooks/persisted.svelte';
import type { AuthResult, Profile } from '$lib/types/auth';

export const getAccessTokenWithAuthRefresh = async (): Promise<string> => {
  const accessToken = new Persisted<string>('access-token', null);
  const refreshToken = new Persisted<string>('refresh-token', null);
  const profile = new Persisted<Profile>('profile', null);

  if (!accessToken.value || isTokenExpired(accessToken.value)) {
    if (!refreshToken.value || isTokenExpired(refreshToken.value)) {
      throw generateError('No valid token available');
    }

    try {
      const result = await api.post<AuthResult>('auth/refresh', { refresh_token: refreshToken.value });
      if (result.status === 'success') {
        accessToken.value = result.data.access_token;
        refreshToken.value = result.data.refresh_token;
        profile.value = result.data.profile;
        return result.data.access_token;
      }
      throw generateError(result.message);
    } catch (e) {
      throw generateError(e);
    }
  }

  return accessToken.value;
};
