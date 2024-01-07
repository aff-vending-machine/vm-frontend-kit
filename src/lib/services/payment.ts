import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { PaymentEntity } from '$lib/types/payment';

const ROOT_PATH = 'payments';

export class PaymentService extends CRUDService<PaymentEntity> {
  private static instance: PaymentService;
  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService(ROOT_PATH);
    }

    return PaymentService.instance;
  }

  private constructor(PATH: string) {
    super(PATH);
  }

  protected remap = (payment: PaymentEntity) => {
    payment.created_at = convertToDate(payment.created_at);
    payment.updated_at = convertToDate(payment.updated_at);

    return payment;
  };

  async enable(id: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.put<void>(`${this.ROOT_PATH}/${id}/enable`, null, { token });
      return { ...result };
    });
  }

  async disable(id: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.put<void>(`${this.ROOT_PATH}/${id}/disable`, null, { token });
      return { ...result };
    });
  }

  async fetch(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const query = `machine_id=${machineID}`;
      const result = await api.post<void>(`${this.ROOT_PATH}/fetch`, null, { query, token });
      return { ...result };
    });
  }

  async push(machineID: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const query = `machine_id=${machineID}`;
      const result = await api.post<void>(`${this.ROOT_PATH}/push`, null, { query, token });
      return { ...result };
    });
  }
}
