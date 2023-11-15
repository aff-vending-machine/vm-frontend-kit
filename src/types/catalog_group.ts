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
