import api from '$lib/api';
import { CRUDService } from '$lib/utils/base/api_1st';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';
import type { ChangePassword, ChangeRole, AccountUser } from '$types/account_user';

const ROOT_PATH = 'users';

export class UserService extends CRUDService<AccountUser> {
  private static instance: UserService;
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(ROOT_PATH);
    }

    return UserService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  // ChangeRole // POST 	{users/:id/change-role}
  async changeRoleByID(id: number, payload: ChangeRole): Promise<void> {
    try {
      const token = await getAccessToken();
      await api.post<void>(`${ROOT_PATH}/${id}/change-role`, payload, { token });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  // ChangePassword // POST 	{users/me/change-password}
  async changePassword(payload: ChangePassword): Promise<void> {
    try {
      const token = await getAccessToken();
      await api.post<void>(`${ROOT_PATH}/me/change-password`, payload, { token });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  // ResetPassword // POST 	{users/:id/reset-password}
  async resetPasswordByID(id: number): Promise<void> {
    try {
      const token = await getAccessToken();
      await api.post<void>(`${ROOT_PATH}/${id}/reset-password`, { token });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
