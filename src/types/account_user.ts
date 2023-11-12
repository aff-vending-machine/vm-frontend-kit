import { convertToAnyDate, convertToDate } from '$lib/utils/convert';
import type { StoreBranch } from './branch';
import type { AccountRole } from './account_role';

export type AccountUser = {
  id: number;
  branch?: StoreBranch;
  branch_id?: number;
  role: AccountRole;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  username: string;
  created_by: string;
  last_login?: Date;
};

export type CreateAccountUser = {
  branch_id?: number;
  role_id: number;
  username: string;
  password: string;
};

export type ChangeRole = {
  id: number;
};

export type ChangePassword = {
  old_password: string;
  new_password: string;
};

export const parseAccountUser = (user: AccountUser) => {
  user.created_at = convertToDate(user.created_at);
  user.updated_at = convertToDate(user.updated_at);
  user.last_login = convertToAnyDate(user.last_login);

  return user;
};
