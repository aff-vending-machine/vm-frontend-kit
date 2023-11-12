import api from '$lib/api';
import { CRUDService } from '$lib/utils/base/api_1st';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';
import type { PaymentTransaction } from '$types/payment_transaction';

const ROOT_PATH = 'transactions';

export class PaymentTransactionService extends CRUDService<PaymentTransaction> {
  constructor() {
    super(ROOT_PATH);
  }

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
