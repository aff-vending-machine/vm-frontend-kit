import type { ActionState } from '$lib/components/ui/reports/transaction/actions/state.svelte';
import { convertToDate } from '$lib/helpers/converter';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { ReportService } from '$lib/services/report';
import type { TransactionReport } from '$lib/types/report';
import { exportCSV, exportXlsx } from '$lib/utils/export';

const reportAPI = ReportService.getInstance();

export class ReportState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #reports = $state<TransactionReport[]>([]);

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

    const result = await reportAPI.transactions(query.toString());
    if (result.status === 'error') throw generateError(result.message);
    this.#reports = result.data;
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

  onDownload = async (ext: 'xlsx' | 'csv') => {
    const filename = await salert.filename(ext);
    if (!filename) return;

    const data = this.#reports.map(toTransactionReportFile);
    switch (ext) {
      case 'csv':
        return exportCSV(filename, data);

      case 'xlsx':
        return exportXlsx(filename, data);
    }
  };

  get ready() {
    return !this.#loading && !this.#error;
  }

  get data() {
    return this.#reports;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}

function toTransactionReportFile(transaction: TransactionReport): Record<string, unknown> {
  const result = { ...transaction } as Record<string, unknown>;
  result.ordered_at = convertToDate(transaction.ordered_at);
  result.payment_requested_at = convertToDate(transaction.payment_requested_at);
  result.confirmed_paid_at = convertToDate(transaction.confirmed_paid_at);
  result.received_item_at = convertToDate(transaction.received_item_at);
  result.items = transaction.cart.map(item => `${item.quantity} x ${item.name} (${item.code})`).join(', ');

  delete result.cart;
  delete result.raw_reference;

  return result;
}
