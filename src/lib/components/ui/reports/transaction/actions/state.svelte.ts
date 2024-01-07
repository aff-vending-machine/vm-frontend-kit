import { parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/time';

export class ActionState {
  #branchID = $state(0);
  #from = $state(defaultForm);
  #to = $state(defaultTo);
  #machineID = $state(0);
  #channelID = $state(0);

  constructor(branchID: number, query: URLSearchParams) {
    this.#from = parseDate(query.get('from'), defaultForm);
    this.#to = parseDate(query.get('to'), defaultTo);
    this.#machineID = parseInt(query.get('machine_id') || '0');
    this.#channelID = parseInt(query.get('channel_id') || '0');
    this.#branchID = branchID;
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    if (this.#machineID !== 0) query.set('machine_id', this.#machineID.toString());
    if (this.#channelID !== 0) query.set('channel_id', this.#channelID.toString());
    query.set('from', this.#from.toISOString());
    query.set('to', this.#to.toISOString());
    query.sort();

    return query;
  }

  get filter() {
    return {
      machineID: this.#machineID,
      channelID: this.#channelID,
      from: this.#from,
      to: this.#to,
    };
  }
}
