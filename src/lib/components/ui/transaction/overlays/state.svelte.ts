import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

export type OverlayMode =
  | { display: 'none'; view: 'none' }
  | { display: 'drawer'; view: 'viewer' }
  | { display: 'alert'; view: 'done' | 'cancel' };

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

  onAlertDone = (data: PaymentTransactionEntity) => {
    this.#mode = { display: 'alert', view: 'done' };
    this.#data = data;
  };

  onAlertCancel = (data: PaymentTransactionEntity) => {
    this.#mode = { display: 'alert', view: 'cancel' };
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
