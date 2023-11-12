import { getAccessToken } from '$lib/utils/jwt';
import api from '$lib/api';
import { genError } from '$lib/utils/generate';
import {
  type MachineReport,
  parseMachineReport,
  type StockReport,
  parseStockReport,
  type TransactionReport,
  parseTransactionReport,
} from '$types/report';

const ROOT_PATH = 'report';

export class AuthService {
  private static instance: AuthService;
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(ROOT_PATH);
    }

    return AuthService.instance;
  }

  private constructor(private PATH: string) {}

  async summary(params?: Record<string, string>): Promise<MachineReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.post<MachineReport[]>(`${this.PATH}/summary`, { params, token });
      const result = list.map(parseMachineReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async stocks(machine_id: number, params?: Record<string, string>): Promise<StockReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.post<StockReport[]>(`${this.PATH}/${machine_id}/stocks`, { params, token });
      const result = list.map(parseStockReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
  async transactions(machine_id: number, params?: Record<string, string>): Promise<TransactionReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.post<TransactionReport[]>(`${this.PATH}/${machine_id}/transactions`, { params, token });
      const result = list.map(parseTransactionReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
