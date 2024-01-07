import api, { type Result } from '$lib/helpers/apis/api';
import { CRUDService } from '$lib/helpers/apis/api_1st';
import type { PaymentChannelEntity } from '$lib/types/payment_channel';

const ROOT_PATH = 'channels';

export class PaymentChannelService extends CRUDService<PaymentChannelEntity> {
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

  protected remap = (channel: PaymentChannelEntity) => {
    return channel;
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
}
