import type { CatalogGroupEntity } from './catalog_group';

export type CatalogProductEntity = {
  id: number;
  created_at: Date;
  updated_at: Date;
  group_id: number;
  sku: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  product_price: number;
  sale_price: number;
  is_enable: boolean;

  group?: CatalogGroupEntity;
};

export type CatalogProductCreateEntity = Omit<CatalogProductEntity, 'id' | 'created_at' | 'updated_at' | 'sku'>;

export type CatalogProductUpdateEntity = Omit<CatalogProductEntity, 'id' | 'created_at' | 'updated_at' | 'sku'>;
