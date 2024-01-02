import type { AccountRole } from './account_role';
import type { StoreBranch } from './store_branch';

export type AccountUserEntity = {
  id: number;
  created_at: Date;
  updated_at: Date;
  username: string;
  created_by: string;
  last_login?: Date;

  branch_id?: number;
  role_id: number;

  branch?: StoreBranch;
  role?: AccountRole;
};

export type AccountUserCreateEntity = Omit<AccountUserEntity, 'id' | 'created_at' | 'updated_at' | 'created_by'> & {
  password: string;
};

export type AccountUserChangeRoleEntity = {
  role_id: number;
};

export type AccountUserChangePasswordEntity = {
  old_password: string;
  new_password: string;
};
