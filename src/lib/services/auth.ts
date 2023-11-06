import { storage } from '$lib/utils/local-storage';
import { parseJWT } from '$lib/utils/jwt';
import { isExpired } from '$lib/utils/check';
import api from '$lib/api';
import type { HttpError_1 } from '@sveltejs/kit';
import { ACCESS_TOKEN, AUTHENTICATED_REMEMBERED, REFRESH_TOKEN } from '$lib/constants';
import type { TokenData } from '$lib/stores/access';

const ROOT_PATH = 'auth';

export type Auth = {
  access_token: string;
  refresh_token: string;
};

export type AuthUser = {
  user_id: number;
  username: string;
  role: string;
};

export class AuthService {
  private static instance: AuthService;
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(ROOT_PATH);
    }

    return AuthService.instance;
  }

  private constructor(private PATH: string) {}

  async login(username: string, password: string, remember?: boolean): Promise<TokenData> {
    try {
      const data = await api.post<Auth>(`${this.PATH}/login`, { username, password });
      storage(ACCESS_TOKEN, data.access_token);

      if (remember) {
        storage(AUTHENTICATED_REMEMBERED, 'TRUE');
        storage(REFRESH_TOKEN, data.refresh_token);
      } else {
        storage(AUTHENTICATED_REMEMBERED, null);
      }

      const result = parseJWT(data.access_token);
      return Promise.resolve(result);
    } catch (e: unknown) {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
      storage(AUTHENTICATED_REMEMBERED, null);

      const err = e as HttpError_1;
      return Promise.reject(err.body.message);
    }
  }

  async authenticated(): Promise<TokenData> {
    try {
      const accessToken = storage(ACCESS_TOKEN);
      const refreshToken = storage(REFRESH_TOKEN);
      if (!accessToken) {
        return Promise.reject('no access token');
      }
      let result = parseJWT(accessToken);

      if (isExpired(result.iat, result.exp)) {
        if (!refreshToken) {
          return Promise.reject('no refresh token');
        }
        result = parseJWT(refreshToken);

        if (isExpired(result.iat, result.exp)) {
          return Promise.reject('refresh token is expired');
        }

        const data = await api.post(`${this.PATH}/refresh`, refreshToken);

        storage(ACCESS_TOKEN, data.access_token);
        storage(REFRESH_TOKEN, data.refresh_token);

        result = parseJWT(data.access_token);
      }

      return Promise.resolve(result);
    } catch (e: unknown) {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
      storage(AUTHENTICATED_REMEMBERED, null);

      const err = e as HttpError_1;
      return Promise.reject(err.body.message);
    }
  }

  async logout(): Promise<void> {
    storage(ACCESS_TOKEN, null);
    storage(REFRESH_TOKEN, null);
    storage(AUTHENTICATED_REMEMBERED, null);

    return Promise.resolve();
  }
}
