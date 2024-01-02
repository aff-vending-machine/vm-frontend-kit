import { CatalogGroupService } from '$lib/services/catalog_group';

const groupAPI = CatalogGroupService.getInstance();

export async function load() {
  const fetchGroupOptions = async () => {
    const groups = await groupAPI.find();
    if (groups.status === 'error') return [];
    return groups.data.map(g => ({ label: g.name, value: g.id, data: g }));
  };

  return {
    options: {
      groups: await fetchGroupOptions(),
    },
  };
}
