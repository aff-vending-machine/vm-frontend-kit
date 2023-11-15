import { storage } from '$lib/utils/local-storage';
import { getAccessToken, parseJWT } from '$lib/utils/jwt';
import api from '$lib/api';
import { ACCESS_TOKEN, AUTHENTICATED_REMEMBERED, REFRESH_TOKEN } from '$lib/constants';
import { genError } from '$lib/utils/generate';
import type { Auth } from '$types/auth';
import type { AccessStore } from '$types/access';

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

  async login(username: string, password: string, remember?: boolean): Promise<AccessStore> {
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
    } catch (e) {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
      storage(AUTHENTICATED_REMEMBERED, null);

      // return Promise.reject(genError(e));
      return Promise.reject('Login failed');
    }
  }

  async authenticate(): Promise<AccessStore> {
    try {
      const accessToken = await getAccessToken();
      const result = parseJWT(accessToken);
      return Promise.resolve(result);
    } catch (e) {
      storage(ACCESS_TOKEN, null);
      storage(REFRESH_TOKEN, null);
      storage(AUTHENTICATED_REMEMBERED, null);

      return Promise.reject(genError(e));
    }
  }

  async logout(): Promise<void> {
    storage(ACCESS_TOKEN, null);
    storage(REFRESH_TOKEN, null);
    storage(AUTHENTICATED_REMEMBERED, null);

    return Promise.resolve();
  }
}
