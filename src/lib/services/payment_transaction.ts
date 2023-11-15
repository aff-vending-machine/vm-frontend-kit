import api from '$lib/api';
import { CRUDService } from '$lib/utils/base/api_1st';
import { convertToDate, convertToAnyDate } from '$lib/utils/convert';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';
import type { PaymentTransaction } from '$types/payment_transaction';

const ROOT_PATH = 'transactions';

export class PaymentTransactionService extends CRUDService<PaymentTransaction> {
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

  protected remap = (data: PaymentTransaction) => {
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

  async done(id: number, note: string): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.post<void>(`${this.ROOT_PATH}/${id}/done`, { note }, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async cancel(id: number, note: string): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.post<void>(`${this.ROOT_PATH}/${id}/cancel`, { note }, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
