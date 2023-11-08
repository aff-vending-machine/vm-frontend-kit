import { CRUDService } from '$lib/utils/base/api';

const ROOT_PATH = 'machines';

export type Machine = {
  id: number;
  branch_id: number;
  // branch: StoreBranch;
  // slots: MachineSlot[];
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

export class MachineService extends CRUDService<Machine> {
  private static instance: MachineService;
  static getInstance(): MachineService {
    if (!MachineService.instance) {
      MachineService.instance = new MachineService(ROOT_PATH);
    }

    return MachineService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }
}
