import type { MachineSlotEntity } from './machine_slot';
import type { StoreBranch } from './store_branch';

export type MachineEntity = {
  id: number;
  branch_id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
  status: string;
  register_count: number;
  test_mode?: boolean;
  version?: string;
  temperature?: number;
  sync_time?: Date;
  sync_slot_time?: Date;
  sync_channel_time?: Date;
  sync_transaction_time?: Date;

  // relations
  branch: StoreBranch;
  slots: MachineSlotEntity[];
};

export type MachineUpdateEntity = Omit<
  MachineEntity,
  'id' | 'branch' | 'slots' | 'created_at' | 'updated_at' | 'register_count' | 'serial_number'
>;

export type Healthz = {
  status: string;
  version: string;
  temperature: number;
};
