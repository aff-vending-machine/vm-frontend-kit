import { CRUDService } from '$lib/utils/base/api_1st';
import type { CatalogGroup } from '$types/catalog_group';

const ROOT_PATH = 'groups';

export class CatalogGroupService extends CRUDService<CatalogGroup> {
  private static instance: CatalogGroupService;
  static getInstance(): CatalogGroupService {
    if (!CatalogGroupService.instance) {
      CatalogGroupService.instance = new CatalogGroupService(ROOT_PATH);
    }

    return CatalogGroupService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }
}
