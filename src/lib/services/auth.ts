import { ACCESS_TOKEN, AUTHENTICATED_REMEMBERED, REFRESH_TOKEN } from '$lib/constants';
import api from '$lib/helpers/apis/api';
import { isTokenExpired } from '$lib/helpers/checker';
import { generateError } from '$lib/helpers/generator';
import type { AuthResult } from '$lib/types/auth';
import { storage } from '$lib/utils/local-storage';

const ROOT_PATH = 'auth';

export class AuthService {
  private static instance: AuthService;
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(ROOT_PATH);
    }

    return AuthService.instance;
  }

  private constructor(private PATH: string) {}

  async login(username: string, password: string, remember?: boolean): Promise<AuthResult> {
    try {
      const result = await api.post<AuthResult>(`${this.PATH}/login`, { username, password });
      storage(ACCESS_TOKEN, result.data!.access_token);
      storage(AUTHENTICATED_REMEMBERED, remember?.toString());
      if (remember) storage(REFRESH_TOKEN, result.data!.refresh_token);

      return result.data!;
    } catch (e) {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
      storage(AUTHENTICATED_REMEMBERED, null);
      throw generateError(e);
    }
  }

  async authenticate(): Promise<void> {
    const accessToken = storage(ACCESS_TOKEN);

    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshToken = storage(REFRESH_TOKEN);
      if (!refreshToken || isTokenExpired(refreshToken)) {
        throw generateError('No valid token available');
      }

      try {
        const result = await api.post<AuthResult>(`${this.PATH}/refresh`, { refresh_token: refreshToken });
        storage(ACCESS_TOKEN, result.data!.access_token);
        storage(REFRESH_TOKEN, result.data!.refresh_token);
      } catch (e) {
        throw generateError(e);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      const token = storage(ACCESS_TOKEN);
      await api.post<void>(`${this.PATH}/logout`, null, { token });
    } catch (e) {
      // Consider logging the error or handling it based on your application's needs
    } finally {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
    }
  }
}
