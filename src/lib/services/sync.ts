import api from '$lib/api';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';

const ROOT_PATH = 'sync';

export class SyncService {
  private static instance: SyncService;
  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService(ROOT_PATH);
    }

    return SyncService.instance;
  }

  private constructor(private PATH: string) {}

  async fetchMachine(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/fetch`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async pushMachine(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/push`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async fetchChannels(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/channels/fetch`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async pushChannels(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/channels/push`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async fetchSlots(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/slots/fetch`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async pushSlots(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/slots/push`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }

  async pullTransactions(machineID: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const result = await api.post<void>(`${this.PATH}/${machineID}/transactions/pull`, null, { token });
      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(genError(e));
    }
  }
}
