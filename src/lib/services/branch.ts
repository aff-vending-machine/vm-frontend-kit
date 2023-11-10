import { CRUDService } from '$lib/utils/base/api';

const ROOT_PATH = 'branches';

export type Branch = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  location: string;
  is_enable: boolean;
};

export class BranchService extends CRUDService<Branch> {
  private static instance: BranchService;
  static getInstance(): BranchService {
    if (!BranchService.instance) {
      BranchService.instance = new BranchService(ROOT_PATH);
    }

    return BranchService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }
}
