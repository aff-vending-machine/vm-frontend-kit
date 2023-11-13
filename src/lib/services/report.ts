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

export class ReportService {
  private static instance: ReportService;
  static getInstance(): ReportService {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService(ROOT_PATH);
    }

    return ReportService.instance;
  }

  private constructor(private PATH: string) {}

  async summary(query?: string): Promise<MachineReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.get<MachineReport[]>(`${this.PATH}/summary`, { query, token });
      const result = list.map(parseMachineReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async stocks(machine_id: number, query?: string): Promise<StockReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.get<StockReport[]>(`${this.PATH}/${machine_id}/stocks`, { query, token });
      const result = list.map(parseStockReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
  async transactions(machine_id: number, query?: string): Promise<TransactionReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.get<TransactionReport[]>(`${this.PATH}/${machine_id}/transactions`, { query, token });
      const result = list.map(parseTransactionReport);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
