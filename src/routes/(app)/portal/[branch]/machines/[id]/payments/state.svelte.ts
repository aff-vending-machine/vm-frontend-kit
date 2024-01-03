import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/payment/actions';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { PaymentService } from '$lib/services/payment';
import type { PaymentEntity, PaymentUpdateEntity } from '$lib/types/payment';

const paymentAPI = PaymentService.getInstance();

export class PaymentState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #payments = $state<PaymentEntity[]>([]);
  #pagination = $state<Pagination>();

  #action: ActionState;

  constructor(action: ActionState) {
    this.#action = action;

    $effect(() => {
      if (action.query.toString() !== this.#blocking) {
        this.#blocking = action.query.toString();
        this.#onfetch();
      }
    });
  }

  #fetch = async () => {
    const query = new URLSearchParams(this.#action.query);
    query.sort();

    const result = await paymentAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#payments = result.data;
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

  onSync = async () => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await paymentAPI.fetch(this.#action.filter.machineID);
      if (result.status === 'error') throw generateError(result.message);
      salert.success('The payments is synced');
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onUpdate = async (id: number, data: PaymentUpdateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await paymentAPI.updateByID(id, data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success('The payments is updated');
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onDelete = async (id: number) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await paymentAPI.deleteByID(id);
      if (result.status === 'error') throw generateError(result.message);
      salert.success('The payments is deleted');
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.success(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  get ready() {
    return !this.#loading && !this.#error;
  }

  get pagination() {
    return this.#pagination!;
  }

  get data() {
    return this.#payments;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
