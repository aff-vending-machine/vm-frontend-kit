import { selector } from './store';

import { CatalogProductService } from '$lib/services/catalog_product';

const productAPI = CatalogProductService.getInstance();

export const handle = {
  action: (e: CustomEvent) => {
    const { mode, data } = e.detail;
    selector.select(mode, data);
  },
  select: async (e: CustomEvent) => {
    const { value } = e.detail;
    const params = new URLSearchParams();
    params.set('machine_id', value.id.toString());
  },
  update: (e: CustomEvent) => {
    console.log(e.detail);
  },
  delete: (e: CustomEvent) => {
    console.log(e.detail);
  },
  close: () => {
    selector.reset();
  },
};

export const call = {
  products: async (groupID: number, query: URLSearchParams) => {
    if (!query.get('page')) query.set('page', '1');
    if (!query.get('per_page')) query.set('per_page', '10');
    if (groupID != 0) query.set('group_id', groupID.toString());
    query.set('preloads', 'Group');
    query.sort();

    return await productAPI.find(query.toString(), true);
  },
};
