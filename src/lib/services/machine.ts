import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToAnyDate, convertToDate } from '$lib/helpers/converter';
import type { Healthz, MachineEntity } from '$lib/types/machine';

const ROOT_PATH = 'machines';

export class MachineService extends CRUDService<MachineEntity> {
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

  protected remap = (data: MachineEntity) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);
    data.sync_time = convertToAnyDate(data.sync_time);
    data.sync_channel_time = convertToAnyDate(data.sync_channel_time);
    data.sync_slot_time = convertToAnyDate(data.sync_slot_time);
    data.sync_transaction_time = convertToAnyDate(data.sync_transaction_time);

    return data;
  };

  // Fetch machine // POST 	{machines/:id/fetch}
  async fetch(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${machineID}/fetch`, null, { token });
      return { ...result };
    });
  }

  // Push machine // POST 	{machines/:id/push}
  async push(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${machineID}/push`, null, { token });
      return { ...result };
    });
  }

  // Healthz machine // GET 	{machines/:id/healthz}
  async healthz(machineID: number): Promise<Result<Healthz>> {
    return this.requestWrapper(async token => {
      const result = await api.get<Healthz>(`${this.ROOT_PATH}/${machineID}/healthz`, { token });
      return { ...result };
    });
  }
}
