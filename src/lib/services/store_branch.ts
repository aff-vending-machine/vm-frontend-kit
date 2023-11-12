import { CRUDService } from '$lib/utils/base/api_1st';
import type { StoreBranch } from '$types/branch';

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
}
