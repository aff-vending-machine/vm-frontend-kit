import dayjs from 'dayjs';

import { parseDate } from '$lib/utils/convert';

export class ActionState {
  #date = dayjs().set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21);
  #defaultForm = this.#date.add(-1, 'day').toDate();
  #defaultTo = this.#date.toDate();

  #branchID = $state(0);
  #from = $state(this.#defaultForm);
  #to = $state(this.#defaultTo);
  #group = $state(true);
  #machineID = $state(0);

  constructor(branchID: number, query: URLSearchParams) {
    this.#from = parseDate(query.get('from'), this.#defaultForm);
    this.#to = parseDate(query.get('to'), this.#defaultTo);
    this.#machineID = parseInt(query.get('machine_id') || '0');
    this.#branchID = branchID;
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    if (this.#machineID !== 0) query.set('machine_id', this.#machineID.toString());
    query.set('from', this.#from.toISOString());
    query.set('to', this.#to.toISOString());
    query.sort();

    return query;
  }

  get filter() {
    return {
      machineID: this.#machineID,
      group: this.#group,
      from: this.#from,
      to: this.#to,
    };
  }
}
