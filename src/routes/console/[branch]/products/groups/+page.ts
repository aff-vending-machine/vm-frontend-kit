import { CatalogGroupService } from '$lib/services/catalog_group';

const groupAPI = CatalogGroupService.getInstance();

export async function load({ url }) {
  const fetchGroup = async () => {
    const query = new URLSearchParams(url.searchParams);
    if (!query.get('limit')) query.set('limit', '10');
    if (query.get('page')) {
      const page = parseInt(query.get('page')!);
      const limit = parseInt(query.get('limit')!);
      const offset = ((page || 1) - 1) * limit;
      query.set('offset', offset.toString());
    }

    return await groupAPI.find(query.toString());
  };

  const fetchGroupCount = async () => {
    const query = new URLSearchParams(url.searchParams);
    query.delete('limit');
    query.delete('page');
    return await groupAPI.count(query.toString());
  };

  return {
    fetch: {
      groups: fetchGroup,
    },
    count: await fetchGroupCount(),
  };
}
