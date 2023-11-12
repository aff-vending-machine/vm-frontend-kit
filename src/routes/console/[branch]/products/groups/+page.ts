import { CatalogGroupService } from '$lib/services/catalog_group';
import { genError } from '$lib/utils/generate';

const service = CatalogGroupService.getInstance();

export async function load({ url }) {
  try {
    const query = new URLSearchParams(url.searchParams);

    return {
      groups: await service.find(query.toString()),
      count: await service.count(),
    };
  } catch (e) {
    return {
      error: genError(e),
      count: 0,
    };
  }
}
