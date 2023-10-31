import { AuthAPI } from '$lib/api/auth';
import { browserClear, browserSet } from '$lib/utils/browser';
import { LOCAL_ACCESS_TOKEN, LOCAL_AUTHENTICATED_REMEMBERED, LOCAL_REFRESH_TOKEN } from '$lib/utils/constants';
import { parseJWT, isExpired } from '$lib/utils/conv';
import { type TokenData, parseTokenData } from '$types/auth';
import type { AxiosError } from 'axios';

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      const api = new AuthAPI();
      AuthService.instance = new AuthService(api);
    }

    return AuthService.instance;
  }

  private constructor(private api: AuthAPI) {}

  async login(username: string, password: string, remember?: boolean): Promise<TokenData> {
    try {
      const data = await this.api.login(username, password);

      browserSet(LOCAL_ACCESS_TOKEN, data.access_token);

      if (remember) {
        browserSet(LOCAL_AUTHENTICATED_REMEMBERED, 'TRUE');
        browserSet(LOCAL_REFRESH_TOKEN, data.refresh_token);
      } else {
        browserClear(LOCAL_AUTHENTICATED_REMEMBERED);
      }

      const token: TokenData = parseJWT(data.access_token);
      const result = parseTokenData(token);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async authenticated(): Promise<TokenData> {
    const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(LOCAL_REFRESH_TOKEN);

    if (!accessToken) {
      return Promise.reject('no access token');
    }

    let token = parseJWT(accessToken);
    let result = parseTokenData(token);

    if (isExpired(result.iat, result.exp)) {
      if (!refreshToken) {
        return Promise.reject('no refresh token');
      }

      token = parseJWT(refreshToken);
      result = parseTokenData(token);

      if (isExpired(result.iat, result.exp)) {
        return Promise.reject('refresh token is expired');
      }

      try {
        const data = await this.api.refreshToken(refreshToken);

        browserSet(LOCAL_ACCESS_TOKEN, data.access_token);
        browserSet(LOCAL_REFRESH_TOKEN, data.refresh_token);

        token = parseJWT(data.access_token);
        result = parseTokenData(token);
      } catch (e: unknown) {
        const err = e as AxiosError;

        // Unauthorized ignore case
        if (err.response?.status == 401) {
          return Promise.reject(Error('unauthorized'));
        }

        const error = Error('service is not available');
        return Promise.reject(error);
      }
    }

    return Promise.resolve(result);
  }

  async logout(): Promise<void> {
    browserClear(LOCAL_ACCESS_TOKEN);
    browserClear(LOCAL_REFRESH_TOKEN);
    browserClear(LOCAL_AUTHENTICATED_REMEMBERED);

    return Promise.resolve();
  }
}
