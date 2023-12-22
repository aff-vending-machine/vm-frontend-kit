import api from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import { convertToDate } from '$lib/helpers/converter';
import type { PaymentChannel } from '$lib/types/payment_channel';

const ROOT_PATH = 'payments';

export class PaymentService extends CRUDService<PaymentChannel> {
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

  protected remap = (channel: PaymentChannel) => {
    channel.created_at = convertToDate(channel.created_at);
    channel.updated_at = convertToDate(channel.updated_at);

    return channel;
  };

  async enable(id: number): Promise<void> {
    return this.requestWrapper(async token => {
      await api.put<void>(`${this.ROOT_PATH}/${id}/enable`, null, { token });
    });
  }

  async disable(id: number): Promise<void> {
    return this.requestWrapper(async token => {
      await api.put<void>(`${this.ROOT_PATH}/${id}/disable`, null, { token });
    });
  }

  async fetchChannels(machineID: number): Promise<void> {
    return this.requestWrapper(async token => {
      const query = `machine_id=${machineID}`;
      await api.post<void>(`${this.ROOT_PATH}/fetch`, null, { query, token });
    });
  }

  async pushChannels(machineID: number): Promise<void> {
    return this.requestWrapper(async token => {
      const query = `machine_id=${machineID}`;
      await api.post<void>(`${this.ROOT_PATH}/push`, null, { query, token });
    });
  }
}
