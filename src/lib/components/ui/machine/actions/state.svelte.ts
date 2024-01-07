export class ActionState {
  #branchID = $state(0);
  #page = $state(1);
  #perPage = $state(10);
  #table = $state(false);

  constructor(branchID: number, query: URLSearchParams) {
    this.#branchID = branchID;
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
    this.#table = query.get('table') === 'true';
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    query.sort();
    return query;
  }

  get filter() {
    return {
      table: this.#table,
      branchID: this.#branchID,
      page: this.#page,
      perPage: this.#perPage,
    };
  }
}
