import api from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { Machine } from '$lib/types/machine';

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

  async fetchMachine(machineID: number): Promise<void> {
    return this.requestWrapper(async token => {
      await api.post<void>(`${this.ROOT_PATH}/${machineID}/fetch`, null, { token });
    });
  }

  async pushMachine(machineID: number): Promise<void> {
    return this.requestWrapper(async token => {
      await api.post<void>(`${this.ROOT_PATH}/${machineID}/push`, null, { token });
    });
  }
}
