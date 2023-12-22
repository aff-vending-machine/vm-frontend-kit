import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { CatalogGroupService } from '$lib/services/catalog_group';

const groupAPI = CatalogGroupService.getInstance();

export const handle = {
  select: (e: CustomEvent) => {
    const { value } = e.detail;
    const params = new URLSearchParams(get(page).url.searchParams);
    params.set('group_id', value.id);

    goto(`/console/${get(page).params.branch}/products?${params.toString()}`);
  },
};

export const call = {
  groups: async (query: URLSearchParams) => {
    if (!query.get('page')) query.set('page', '1');
    if (!query.get('per_page')) query.set('per_page', '10');
    query.set('preloads', 'Products');
    query.sort();

    return await groupAPI.find(query.toString(), true);
  },
};
