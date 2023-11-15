import { CRUDService } from '$lib/utils/base/api_2nd';
import { convertToDate } from '$lib/utils/convert';
import type { MachineSlot } from '$types/machine_slot';

const ROOT_PATH = 'machines';
const SUB_PATH = 'slots';

export class MachineSlotService extends CRUDService<MachineSlot> {
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

  protected remap = (slot: MachineSlot) => {
    slot.created_at = convertToDate(slot.created_at);
    slot.updated_at = convertToDate(slot.updated_at);

    return slot;
  };
}
