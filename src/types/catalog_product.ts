import type { CatalogGroup } from './catalog_group';

export type CatalogProduct = {
  id: number;
  group_id: number;
  group: CatalogGroup;
  created_at: Date;
  updated_at: Date;
  sku: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  product_price: number;
  sale_price: number;
  is_enable: boolean;
};

export type CreateCatalogProduct = {
  group_id: number;
  sku: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  product_price: number;
  sale_price: number;
  is_enable: boolean;
};

export type UpdateCatalogProduct = {
  group_id?: number;
  name?: string;
  description?: string;
  image_url?: string;
  barcode?: string;
  product_price?: number;
  sale_price?: number;
  is_enable?: boolean;
};
