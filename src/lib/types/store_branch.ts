export type StoreBranchEntity = {
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
