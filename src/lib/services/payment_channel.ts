import api from '$lib/api';
import { CRUDService } from '$lib/utils/base/api_1st';
import { convertToDate } from '$lib/utils/convert';
import { genError } from '$lib/utils/generate';
import { getAccessToken } from '$lib/utils/jwt';
import type { PaymentChannel } from '$types/payment_channel';

const ROOT_PATH = 'channels';

export class PaymentChannelService extends CRUDService<PaymentChannel> {
  private static instance: PaymentChannelService;
  static getInstance(): PaymentChannelService {
    if (!PaymentChannelService.instance) {
      PaymentChannelService.instance = new PaymentChannelService(ROOT_PATH);
    }

    return PaymentChannelService.instance;
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
    try {
      const token = await getAccessToken();
      const data = await api.put<void>(`${this.ROOT_PATH}/${id}/enable`, null, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async disable(id: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.put<void>(`${this.ROOT_PATH}/${id}/disable`, null, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
