import { parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/time';

export class ActionState {
  #branchID = $state(0);
  #page = $state(1);
  #perPage = $state(10);
  #startDate = $state(defaultForm);
  #endDate = $state(defaultTo);
  #machineID = $state(0);
  #channelID = $state(0);
  #status = $state('');
  #error = $state(false);

  constructor(branchID: number, query: URLSearchParams) {
    this.#branchID = branchID;
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
    this.#startDate = parseDate(query.get('start_date'), defaultForm);
    this.#endDate = parseDate(query.get('end_date'), defaultTo);
    this.#error = query.get('is_error') === 'true';
    this.#machineID = parseInt(query.get('machine_id') ?? '0');
    this.#channelID = parseInt(query.get('channel_id') ?? '0');
    this.#status = query.get('order_status') ?? '';
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    query.set('start_date', this.#startDate.toISOString());
    query.set('end_date', this.#endDate.toISOString());
    if (this.#machineID !== 0) query.set('machine_id', this.#machineID.toString());
    if (this.#channelID !== 0) query.set('channel_id', this.#channelID.toString());
    if (this.#status !== '') query.set('order_status', this.#status.toString());
    if (this.#error) query.set('is_error', this.#error.toString());
    query.set('sort_by', 'created_at:desc');
    query.sort();

    return query;
  }

  get filter() {
    return {
      page: this.#page,
      perPage: this.#perPage,
      startDate: this.#startDate,
      endDate: this.#endDate,
      machineID: this.#machineID,
      channelID: this.#channelID,
      status: this.#status,
      error: this.#error,
    };
  }
}
