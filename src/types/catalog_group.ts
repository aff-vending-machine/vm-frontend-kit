import { convertToDate } from '$lib/utils/convert';
import type { CatalogProduct } from './catalog_product';

export type CatalogGroup = {
  id: number;
  products: CatalogProduct[];
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  is_enable: boolean;
};

export type CreateCatalogGroup = {
  name: string;
  description: string;
  is_enable: boolean;
};

export type UpdateCatalogGroup = {
  name?: string;
  description?: string;
  is_enable?: boolean;
};

export const parseCatalogGroup = (group: CatalogGroup) => {
  group.created_at = convertToDate(group.created_at);
  group.updated_at = convertToDate(group.updated_at);

  return group;
};
