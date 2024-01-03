import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/transaction/actions';
import type { OverlayState } from '$lib/components/ui/transaction/overlays';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { PaymentTransactionService } from '$lib/services/payment_transaction';
import type { Entity } from '$lib/types/common';
import type { PaymentTransactionEntity } from '$lib/types/payment_transaction';

const transactionAPI = PaymentTransactionService.getInstance();

export class TransactionState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #transactions = $state<PaymentTransactionEntity[]>([]);
  #pagination = $state<Pagination>();

  #action: ActionState;
  #overlay: OverlayState;

  constructor(action: ActionState, drawer: OverlayState) {
    this.#action = action;
    this.#overlay = drawer;

    $effect(() => {
      if (action.query.toString() !== this.#blocking) {
        this.#blocking = action.query.toString();
        this.#onfetch();
      }
    });
  }

  #fetch = async () => {
    const query = new URLSearchParams(this.#action.query);
    query.set('preloads', 'Payment');
    query.sort();

    const result = await transactionAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#transactions = result.data;
    this.#pagination = result.pagination!;
  };

  #onfetch = async () => {
    this.#loading = true;
    this.#error = undefined;

    try {
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onSync = () => {};

  onAction = (mode: string, data: Entity) => {
    const entity = data as PaymentTransactionEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
  };

  onSelect = (data: Entity) => {
    const entity = data as PaymentTransactionEntity;
    this.#overlay.onOpenViewer(entity);
  };

  get ready() {
    return !this.#loading && !this.#error;
  }

  get pagination() {
    return this.#pagination!;
  }

  get data() {
    return this.#transactions;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
