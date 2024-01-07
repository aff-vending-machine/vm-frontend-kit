export class ActionState {
  #branchID = $state(1);
  #page = $state(1);
  #perPage = $state(10);
  #roleID = $state(0);

  constructor(branchID: number, query: URLSearchParams) {
    this.#branchID = branchID;
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
    this.#roleID = parseInt(query.get('role_id') ?? '0');
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#branchID !== 0) query.set('branch_id', this.#branchID.toString());
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    if (this.#roleID !== 0) query.set('role_id', this.#roleID.toString());
    query.sort();
    return query;
  }

  get filter() {
    return {
      page: this.#page,
      perPage: this.#perPage,
      roleID: this.#roleID,
    };
  }
}
