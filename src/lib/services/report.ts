import api, { type Result } from '$lib/helpers/apis/api';
import { convertToDate } from '$lib/helpers/converter';
import { generateError } from '$lib/helpers/generator';
import { getAccessTokenWithAuthRefresh } from '$lib/helpers/jwt';
import type { MachineReport, StockReport, TransactionReport } from '$lib/types/report';

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

  protected async requestWrapper<R>(callback: (token: string) => Promise<R>): Promise<R> {
    try {
      const token = await getAccessTokenWithAuthRefresh();
      return await callback(token);
    } catch (e) {
      throw generateError(e);
    }
  }

  async summary(query?: string): Promise<Result<MachineReport[]>> {
    return this.requestWrapper(async token => {
      const result = await api.get<MachineReport[]>(`${this.PATH}/summary`, { query, token });
      return { ...result };
    });
  }

  async stocks(machine_id: number, query?: string): Promise<Result<StockReport[]>> {
    return this.requestWrapper(async token => {
      const result = await api.get<StockReport[]>(`${this.PATH}/${machine_id}/stocks`, { query, token });
      return { ...result };
    });
  }
  async transactions(machine_id: number, query?: string): Promise<Result<TransactionReport[]>> {
    return this.requestWrapper(async token => {
      const result = await api.get<TransactionReport[]>(`${this.PATH}/${machine_id}/transactions`, { query, token });
      return { ...result, data: result.data!.map(this.remapTransaction) };
    });
  }
}
