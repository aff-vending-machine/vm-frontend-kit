import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { AccountRole } from '$lib/types/account_role';

const ROOT_PATH = 'roles';

export class AccountRoleService extends CRUDService<AccountRole> {
  private static instance: AccountRoleService;
  static getInstance(): AccountRoleService {
    if (!AccountRoleService.instance) {
      AccountRoleService.instance = new AccountRoleService(ROOT_PATH);
    }

    return AccountRoleService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (data: AccountRole) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);

    return data;
  };
}
