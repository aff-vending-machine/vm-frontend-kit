import type { StoreBranch } from './branch';
import type { MachineSlot } from './machine_slot';

export type Machine = {
  id: number;
  branch_id: number;
  branch: StoreBranch;
  slots: MachineSlot[];
  created_at: Date;
  updated_at: Date;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
  status: string;
  register_count: number;
  sync_time?: Date;
  sync_slot_time?: Date;
  sync_channel_time?: Date;
  sync_transaction_time?: Date;
};
