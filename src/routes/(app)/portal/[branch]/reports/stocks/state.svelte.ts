import type { ActionState } from '$lib/components/ui/reports/stock/actions';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { ReportService } from '$lib/services/report';
import type { StockReport } from '$lib/types/report';
import { exportCSV, exportXlsx } from '$lib/utils/export';

const reportAPI = ReportService.getInstance();

export class ReportState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #reports = $state<StockReport[]>([]);

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

    const result = await reportAPI.stocks(query.toString());
    if (result.status === 'error') throw generateError(result.message);

    this.#reports = result.data.sort((a: StockReport, b: StockReport) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
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

  #regroupData = () => {
    if (this.#action.filter.group) {
      return this.#reports.reduce((result, data) => {
        const idx = result.findIndex(r => r.name === data.name && r.sale_price === data.sale_price);

        if (idx >= 0) {
          if (!result[idx].code.includes(data.code)) {
            let codes = result[idx].code.split(', ');
            codes = codes.concat(data.code).sort();
            result[idx].code = codes.join(', ');
          }

          result[idx].sold += data.sold;
          result[idx].total_price = result[idx].sale_price * result[idx].sold;

          for (const [key, value] of Object.entries(data.total_payments)) {
            if (!result[idx].total_payments[key]) {
              result[idx].total_payments[key] = value;
            } else {
              result[idx].total_payments[key] += value;
            }
          }
        } else {
          result = result.concat({
            ...data,
            total_payments: { ...data.total_payments },
          });
        }

        return result;
      }, [] as StockReport[]);
    } else {
      return this.#reports;
    }
  };

  onDownload = (e: CustomEvent) => {
    const { filename, application } = e.detail;
    const data = this.#regroupData().map(toStockReportFile);
    switch (application) {
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
    return this.#regroupData();
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}

function toStockReportFile(stock: StockReport) {
  return {
    code: stock.code,
    name: stock.name,
    sold: stock.sold,
    sale_price: stock.sale_price,
    creditcard: stock.total_payments['creditcard'] || 0,
    promptpay: stock.total_payments['promptpay'] || 0,
    total_price: stock.total_price,
  };
}
