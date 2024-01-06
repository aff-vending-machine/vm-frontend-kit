import dayjs from 'dayjs';

import { parseDate } from '$lib/utils/convert';

export class ActionState {
  #defaultForm = dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate();
  #defaultTo = dayjs().set('hour', 23).set('minute', 59).set('second', 59).toDate();

  #branchID = $state(0);
  #from = $state(this.#defaultForm);
  #to = $state(this.#defaultTo);
  #machineID = $state(0);
  #group = $state(true);

  constructor(branchID: number, query: URLSearchParams) {
    this.#branchID = branchID;
    this.#from = parseDate(query.get('from'), this.#defaultForm);
    this.#to = parseDate(query.get('to'), this.#defaultTo);
    this.#machineID = parseInt(query.get('machine_id') || '0');
  }

  onGroupChange = (group: boolean) => (this.#group = group);

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    query.set('from', this.#from.toISOString());
    query.set('to', this.#to.toISOString());
    if (this.#machineID !== 0) query.set('machine_id', this.#machineID.toString());
    query.set('sort_by', 'created_at:desc');
    query.sort();

    return query;
  }

  get filter() {
    return {
      from: this.#from,
      to: this.#to,
      machineID: this.#machineID,
      group: this.#group,
    };
  }
}
