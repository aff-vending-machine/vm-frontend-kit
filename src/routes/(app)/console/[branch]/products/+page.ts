import { CatalogGroupService } from '$lib/services/catalog_group';
import { genKey } from '$lib/utils/generate';

const groupAPI = CatalogGroupService.getInstance();

export async function load() {
  const fetchGroupOptions = async () => {
    const branches = await groupAPI.find();
    return branches.data!.map(b => ({ label: b.name, value: b.id, data: genKey(b.name) }));
  };

  return {
    options: {
      groups: await fetchGroupOptions(),
    },
  };
}
