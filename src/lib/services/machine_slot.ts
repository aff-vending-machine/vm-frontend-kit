import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_2nd';
import { convertToDate } from '$lib/helpers/converter';
import type { MachineSlotEntity, MachineSlotUpdateEntity } from '$lib/types/machine_slot';

const ROOT_PATH = 'machines';
const SUB_PATH = 'slots';

export class MachineSlotService extends CRUDService<MachineSlotEntity> {
  private static instance: MachineSlotService;
  static getInstance(): MachineSlotService {
    if (!MachineSlotService.instance) {
      MachineSlotService.instance = new MachineSlotService(ROOT_PATH, SUB_PATH);
    }

    return MachineSlotService.instance;
  }

  private constructor(ROOT_PATH: string, SUB_PATH: string) {
    super(ROOT_PATH, SUB_PATH);
  }

  protected remap = (slot: MachineSlotEntity) => {
    slot.created_at = convertToDate(slot.created_at);
    slot.updated_at = convertToDate(slot.updated_at);

    return slot;
  };

  // Bulk Update Slot // PUT 	{machines/:id/slots/bulk}
  async bulkUpdate(machine_id: number, payload: MachineSlotUpdateEntity[]): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.put<void>(`${this.ROOT_PATH}/${machine_id}/${this.SUB_PATH}/bulk`, payload, { token });
      return { ...result };
    });
  }

  async fetch(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${machineID}/${this.SUB_PATH}/fetch`, null, { token });
      return { ...result };
    });
  }

  async push(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${machineID}/${this.SUB_PATH}/push`, null, { token });
      return { ...result };
    });
  }
}
