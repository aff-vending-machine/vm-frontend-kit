import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { StoreBranch } from '$lib/types/store_branch';

const ROOT_PATH = 'branches';

export class BranchService extends CRUDService<StoreBranch> {
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

  protected remap = (branch: StoreBranch) => {
    branch.created_at = convertToDate(branch.created_at);
    branch.updated_at = convertToDate(branch.updated_at);

    return branch;
  };
}
