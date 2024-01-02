import type { CatalogProductEntity } from './catalog_product';

export type MachineSlotEntity = {
  id: number;
  machine_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
  code: string;
  stock: number;
  capacity: number;
  spiral: number;
  is_enable: boolean;

  product?: CatalogProductEntity;
};

export type MachineSlotUpdateEntity = Omit<MachineSlotEntity, 'id' | 'machine_id' | 'created_at' | 'updated_at'>;
