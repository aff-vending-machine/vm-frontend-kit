import { parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/time';

export class ActionState {
  #from = $state(defaultForm);
  #to = $state(defaultTo);
  #branchID = $state(0);

  constructor(branchID: number, query: URLSearchParams) {
    this.#from = parseDate(query.get('from'), defaultForm);
    this.#to = parseDate(query.get('to'), defaultTo);
    this.#branchID = branchID;
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    query.set('from', this.#from.toISOString());
    query.set('to', this.#to.toISOString());
    query.sort();

    return query;
  }

  get filter() {
    return {
      from: this.#from,
      to: this.#to,
    };
  }
}
