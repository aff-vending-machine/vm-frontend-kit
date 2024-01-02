import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToAnyDate, convertToDate } from '$lib/helpers/converter';
import type {
  AccountUserChangePasswordEntity,
  AccountUserChangeRoleEntity,
  AccountUserEntity,
} from '$lib/types/account_user';

const ROOT_PATH = 'users';

export class AccountUserService extends CRUDService<AccountUserEntity> {
  private static instance: AccountUserService;
  static getInstance(): AccountUserService {
    if (!AccountUserService.instance) {
      AccountUserService.instance = new AccountUserService(ROOT_PATH);
    }

    return AccountUserService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (data: AccountUserEntity) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);
    data.last_login = convertToAnyDate(data.last_login);

    return data;
  };

  // ChangeRole // POST 	{users/:id/change-role}
  async changeRoleByID(id: number, payload: AccountUserChangeRoleEntity): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${id}/change-role`, payload, { token });
      return { ...result };
    });
  }

  // ChangePassword // POST 	{users/me/change-password}
  async changePassword(payload: AccountUserChangePasswordEntity): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/me/change-password`, payload, { token });
      return { ...result };
    });
  }

  // ResetPassword // POST 	{users/:id/reset-password}
  async resetPasswordByID(id: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${id}/reset-password`, null, { token });
      return { ...result };
    });
  }
}
