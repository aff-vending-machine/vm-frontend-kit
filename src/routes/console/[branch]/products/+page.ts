import { CatalogGroupService } from '$lib/services/catalog_group';
import { CatalogProductService } from '$lib/services/catalog_product';

const productAPI = CatalogProductService.getInstance();
const groupAPI = CatalogGroupService.getInstance();

export async function load({ url }) {
  const fetchProduct = async () => {
    const query = new URLSearchParams(url.searchParams);
    if (!query.get('limit')) query.set('limit', '10');
    if (query.get('page')) {
      const page = parseInt(query.get('page')!);
      const limit = parseInt(query.get('limit')!);
      const offset = ((page || 1) - 1) * limit;
      query.set('offset', offset.toString());
    }

    query.set('preloads', 'Group');

    return await productAPI.find(query.toString());
  };

  const fetchProductCount = async () => {
    const query = new URLSearchParams(url.searchParams);
    query.delete('limit');
    query.delete('page');
    return await productAPI.count(query.toString());
  };

  const fetchProductGroupOptions = async () => {
    const groups = await groupAPI.find();
    return groups.map(g => ({ label: g.name, value: g.id }));
  };

  return {
    fetch: {
      products: fetchProduct,
    },
    count: await fetchProductCount(),
    options: {
      groups: await fetchProductGroupOptions(),
    },
  };
}
