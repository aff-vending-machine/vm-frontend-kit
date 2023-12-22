import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { CatalogProduct } from '$lib/types/catalog_product';

const ROOT_PATH = 'products';

export class CatalogProductService extends CRUDService<CatalogProduct> {
  private static instance: CatalogProductService;
  static getInstance(): CatalogProductService {
    if (!CatalogProductService.instance) {
      CatalogProductService.instance = new CatalogProductService(ROOT_PATH);
    }

    return CatalogProductService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (data: CatalogProduct) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);

    return data;
  };
}
