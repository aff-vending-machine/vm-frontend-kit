import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToAnyDate, convertToDate } from '$lib/helpers/converter';
import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

const ROOT_PATH = 'transactions';

export class PaymentTransactionService extends CRUDService<PaymentTransactionEntity> {
  private static instance: PaymentTransactionService;
  static getInstance(): PaymentTransactionService {
    if (!PaymentTransactionService.instance) {
      PaymentTransactionService.instance = new PaymentTransactionService(ROOT_PATH);
    }

    return PaymentTransactionService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (data: PaymentTransactionEntity) => {
    data.created_at = convertToDate(data.created_at);
    data.updated_at = convertToDate(data.updated_at);
    data.ordered_at = convertToDate(data.ordered_at);
    data.payment_requested_at = convertToAnyDate(data.payment_requested_at);
    data.cancelled_at = convertToAnyDate(data.cancelled_at);
    data.confirmed_paid_at = convertToAnyDate(data.confirmed_paid_at);
    data.refund_at = convertToAnyDate(data.refund_at);
    data.received_item_at = convertToAnyDate(data.received_item_at);
    data.error_at = convertToAnyDate(data.error_at);

    return data;
  };

  async done(id: number, note: string): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${id}/done`, { note }, { token });
      return { ...result };
    });
  }

  async cancel(id: number, note: string): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.post<void>(`${this.ROOT_PATH}/${id}/cancel`, { note }, { token });
      return { ...result };
    });
  }

  async pull(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const query = `machine_id=${machineID}`;
      const result = await api.post<void>(`${this.ROOT_PATH}/pull`, null, { query, token });
      return { ...result };
    });
  }
}
