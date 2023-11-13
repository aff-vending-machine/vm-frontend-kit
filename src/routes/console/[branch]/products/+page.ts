import { CatalogGroupService } from '$lib/services/catalog_group';
import { CatalogProductService } from '$lib/services/catalog_product';
import { genError } from '$lib/utils/generate';

const productAPI = CatalogProductService.getInstance();
const groupAPI = CatalogGroupService.getInstance();

export async function load({ url }) {
  try {
    const query = new URLSearchParams(url.searchParams);
    const query2 = new URLSearchParams(url.searchParams);
    if (!query.get('limit')) query.set('limit', '10');
    query.set('preloads', 'Group');

    query2.delete('limit');
    query2.delete('offset');

    return {
      products: await productAPI.find(query.toString()),
      count: await productAPI.count(query2.toString()),
      options: {
        groups: (await groupAPI.find()).map(g => ({ label: g.name, value: g.id, data: g })),
      },
    };
  } catch (e) {
    return {
      error: genError(e),
      count: 0,
    };
  }
}
