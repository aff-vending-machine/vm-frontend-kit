import api from '$lib/api';
import { convertToDate } from '$lib/utils/convert';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';
import type { MachineReport, StockReport, TransactionReport } from '$types/report';

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

  remapTransaction = (data: TransactionReport) => {
    data.ordered_at = convertToDate(data.ordered_at);
    data.payment_requested_at = convertToDate(data.payment_requested_at);
    data.confirmed_paid_at = convertToDate(data.confirmed_paid_at);
    data.received_item_at = convertToDate(data.received_item_at);
    return data;
  };

  async summary(query?: string): Promise<MachineReport[]> {
    try {
      const token = await getAccessToken();
      const result = await api.get<MachineReport[]>(`${this.PATH}/summary`, { query, token });
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async stocks(machine_id: number, query?: string): Promise<StockReport[]> {
    try {
      const token = await getAccessToken();
      const result = await api.get<StockReport[]>(`${this.PATH}/${machine_id}/stocks`, { query, token });
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
  async transactions(machine_id: number, query?: string): Promise<TransactionReport[]> {
    try {
      const token = await getAccessToken();
      const list = await api.get<TransactionReport[]>(`${this.PATH}/${machine_id}/transactions`, { query, token });
      const result = list.map(this.remapTransaction);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
