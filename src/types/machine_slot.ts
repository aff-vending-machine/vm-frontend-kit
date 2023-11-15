import type { CatalogProduct } from './catalog_product';

export type MachineSlot = {
  id: number;
  machine_id: number;
  product_id: number;
  product: CatalogProduct;
  created_at: Date;
  updated_at: Date;
  code: string;
  stock: number;
  capacity: number;
  is_enable: boolean;
};

export type CreateMachineSlot = {
  product_id: number;
  code: string;
  stock: number;
  capacity: number;
  is_enable: boolean;
};

export type UpdateMachineSlot = {
  product_id?: number;
  stock?: number;
  capacity?: number;
  is_enable?: boolean;
};

export type BulkUpdateMachineSlot = {
  id?: number;
  product_id?: number;
  stock?: number;
  capacity?: number;
  is_enable?: boolean;
}[];
