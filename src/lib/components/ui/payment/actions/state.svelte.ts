export class ActionState {
  #machineID = $state(0);
  #page = $state(1);
  #perPage = $state(10);

  constructor(machineID: number, query: URLSearchParams) {
    this.#machineID = machineID;
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#machineID !== 0) query.set('machine_id', this.#machineID.toString());
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    query.sort();
    return query;
  }

  get filter() {
    return {
      machineID: this.#machineID,
      page: this.#page,
      perPage: this.#perPage,
    };
  }
}
