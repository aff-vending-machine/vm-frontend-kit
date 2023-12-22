import api from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToAnyDate, convertToDate } from '$lib/helpers/converter';
import type { AccountUser, ChangePassword, ChangeRole } from '$lib/types/account_user';

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

  protected remap = (data: AccountUser) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);
    data.last_login = convertToAnyDate(data.last_login);

    return data;
  };

  // ChangeRole // POST 	{users/:id/change-role}
  async changeRoleByID(id: number, payload: ChangeRole): Promise<void> {
    return this.requestWrapper(async token => {
      await api.post<void>(`${this.ROOT_PATH}/${id}/change-role`, payload, { token });
    });
  }

  // ChangePassword // POST 	{users/me/change-password}
  async changePassword(payload: ChangePassword): Promise<void> {
    return this.requestWrapper(async token => {
      await api.post<void>(`${this.ROOT_PATH}/me/change-password`, payload, { token });
    });
  }

  // ResetPassword // POST 	{users/:id/reset-password}
  async resetPasswordByID(id: number): Promise<void> {
    return this.requestWrapper(async token => {
      await api.post<void>(`${this.ROOT_PATH}/${id}/reset-password`, null, { token });
    });
  }
}
