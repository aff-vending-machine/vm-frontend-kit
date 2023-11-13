import { convertToDate } from '$lib/utils/convert';

export type StoreBranch = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  location: string;
  is_enable: boolean;
};

export type CreateStoreBranch = {
  name: string;
  location: string;
  is_enable: boolean;
};

export type UpdateStoreBranch = {
  name?: string;
  location?: string;
  is_enable?: boolean;
};

export const parseStoreBranch = (branch: StoreBranch) => {
  branch.created_at = convertToDate(branch.created_at);
  branch.updated_at = convertToDate(branch.updated_at);

  return branch;
};
