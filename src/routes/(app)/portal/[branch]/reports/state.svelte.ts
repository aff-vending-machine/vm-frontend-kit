import type { ActionState } from '$lib/components/ui/reports/summary/actions';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { ReportService } from '$lib/services/report';
import type { MachineReport } from '$lib/types/report';

const reportAPI = ReportService.getInstance();

export class ReportState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #reports = $state<MachineReport[]>([]);

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

    const result = await reportAPI.summary(query.toString());
    if (result.status === 'error') throw generateError(result.message);

    this.#reports = result.data;
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

  onSelect = () => {};

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
