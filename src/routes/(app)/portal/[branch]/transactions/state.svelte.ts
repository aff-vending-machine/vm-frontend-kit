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
  #machineIDs: number[];

  constructor(machineIDs: number[], action: ActionState, drawer: OverlayState) {
    this.#machineIDs = machineIDs;
    this.#action = action;
    this.#overlay = drawer;

    $effect(() => {
      if (action.query.toString() !== this.#blocking) {
        this.#blocking = action.query.toString();
        this.#onfetch();
      }
    });
  }

  #pull = async (machineID: number) => {
    try {
      const result = await transactionAPI.pull(machineID);
      if (result.status === 'error') {
        return;
      } else {
        return result.data;
      }
    } catch (e) {
      return;
    }
  };

  #fetch = async () => {
    const query = new URLSearchParams(this.#action.query);
    query.set('preloads', 'Branch:Machine:Channel');
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
      await this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onPull = async () => {
    const maxConcurrent = 5;
    const tasks = [];

    for (let i = 0; i < this.#machineIDs.length; i += maxConcurrent) {
      const chunk = this.#machineIDs.slice(i, i + maxConcurrent);
      const promises = chunk.map(id => this.#pull(id));
      tasks.push(...promises);
    }

    this.#loading = true;
    this.#error = undefined;

    try {
      await Promise.all(tasks);
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onDone = async (id: number, reason: string) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await transactionAPI.done(id, reason);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`transaction '${id}' has been done`);
      await this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onCancel = async (id: number, reason: string) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await transactionAPI.cancel(id, reason);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`transaction '${id}' has been cancelled`);
      await this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onAction = (mode: string, data: Entity) => {
    const entity = data as PaymentTransactionEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
    if (mode === 'done') this.#overlay.onAlertDone(entity);
    if (mode === 'cancel') this.#overlay.onAlertCancel(entity);
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
