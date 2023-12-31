import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { StoreBranchEntity } from '$lib/types/store_branch';

const ROOT_PATH = 'branches';

export class StoreBranchService extends CRUDService<StoreBranchEntity> {
  private static instance: StoreBranchService;
  static getInstance(): StoreBranchService {
    if (!StoreBranchService.instance) {
      StoreBranchService.instance = new StoreBranchService(ROOT_PATH);
    }

    return StoreBranchService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (branch: StoreBranchEntity) => {
    branch.created_at = convertToDate(branch.created_at);
    branch.updated_at = convertToDate(branch.updated_at);

    return branch;
  };
}
