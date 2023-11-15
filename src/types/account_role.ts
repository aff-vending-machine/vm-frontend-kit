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
