import { CRUDService } from '$lib/utils/base/api_1st';
import type { CatalogProduct } from '$types/catalog_product';

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
}
