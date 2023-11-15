import { CRUDService } from '$lib/utils/base/api_1st';
import { convertToDate } from '$lib/utils/convert';
import type { Machine } from '$types/machine';

const ROOT_PATH = 'machines';

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

  protected remap = (data: Machine) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);

    return data;
  };
}
