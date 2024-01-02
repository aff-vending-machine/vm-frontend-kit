import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

export type OverlayMode = { display: 'none'; view: 'none' } | { display: 'drawer'; view: 'viewer' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<PaymentTransactionEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenViewer = (data: PaymentTransactionEntity) => {
    this.#mode = { display: 'drawer', view: 'viewer' };
    this.#data = data;
  };

  onCancel = () => {
    this.close();
  };

  get data() {
    return this.#data!;
  }

  get mode() {
    return this.#mode!;
  }
}
