import { Client } from '$lib/utils/api/client';
import { handleResponse, handleError } from '$lib/utils/api/handle';
import { BaseAPI } from '$lib/utils/api/service';
import type { Auth } from '$types/auth';

const ROOT_PATH = 'auth';

export class AuthAPI extends BaseAPI {
  constructor() {
    super(ROOT_PATH);
  }

  async login(username: string, password: string): Promise<Auth> {
    try {
      const { data } = await Client.getPublic().post<APIProtocol<Auth>>(`${ROOT_PATH}/login`, { username, password });
      return handleResponse<Auth>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async refreshToken(token: string): Promise<Auth> {
    try {
      const { data } = await Client.getPublic().post<APIProtocol<Auth>>(`${ROOT_PATH}/refresh-token`, null, {
        headers: { authorization: `Bearer ${token}` },
      });
      return handleResponse<Auth>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
