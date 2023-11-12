import { convertToDate } from '$lib/utils/convert';

export type AccountRole = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  scope: string;
  level: number;
};

export type CreateAccountRole = {
  name: string;
  permissions: Permission[];
};

export type UpdateAccountRole = {
  permissions?: Permission[];
};

export const parseAccountRole = (role: AccountRole) => {
  role.created_at = convertToDate(role.created_at);
  role.updated_at = convertToDate(role.updated_at);

  return role;
};
