import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { AccountRole } from '$lib/types/account_role';

const ROOT_PATH = 'roles';

export class RoleService extends CRUDService<AccountRole> {
  private static instance: RoleService;
  static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService(ROOT_PATH);
    }

    return RoleService.instance;
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
