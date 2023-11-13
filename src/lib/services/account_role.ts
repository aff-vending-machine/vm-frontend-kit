import { CRUDService } from '$lib/utils/base/api_1st';
import type { AccountRole } from '$types/account_role';

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
}
