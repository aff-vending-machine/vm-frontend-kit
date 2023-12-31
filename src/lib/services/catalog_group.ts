import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { CatalogGroupEntity } from '$lib/types/catalog_group';

const ROOT_PATH = 'groups';

export class CatalogGroupService extends CRUDService<CatalogGroupEntity> {
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

  protected remap = (data: CatalogGroupEntity) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);

    return data;
  };
}
