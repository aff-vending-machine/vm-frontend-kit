import api from '$lib/helpers/apis/api';
import { isTokenExpired } from '$lib/helpers/checker';
import { generateError } from '$lib/helpers/generator';
import type { AuthResult } from '$lib/types/auth';

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

  async login(username: string, password: string): Promise<AuthResult> {
    try {
      const result = await api.post<AuthResult>(`${this.PATH}/login`, { username, password });
      if (result.status === 'error') throw generateError(result.message);
      return result.data;
    } catch (e) {
      throw generateError(e);
    }
  }

  async authenticate(access: string | null, refresh?: string | null): Promise<AuthResult | null> {
    if (!access || isTokenExpired(access)) {
      if (!refresh || isTokenExpired(refresh)) {
        throw generateError('No valid token available');
      }

      try {
        const result = await api.post<AuthResult>(`${this.PATH}/refresh`, { refresh_token: refresh });
        if (result.status === 'error') throw result.message;
        return result.data;
      } catch (e) {
        throw generateError(e);
      }
    }

    return null;
  }

  async logout(token: string): Promise<void> {
    await api.post<void>(`${this.PATH}/logout`, null, { token });
  }
}
