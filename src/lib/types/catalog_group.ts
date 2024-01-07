import type { CatalogProductEntity } from './catalog_product';

export type CatalogGroupEntity = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  is_enable: boolean;

  products?: CatalogProductEntity[];
};

export type CatalogGroupCreateEntity = Omit<CatalogGroupEntity, 'id' | 'created_at' | 'updated_at'>;

export type CatalogGroupUpdateEntity = Omit<CatalogGroupEntity, 'id' | 'created_at' | 'updated_at'>;
