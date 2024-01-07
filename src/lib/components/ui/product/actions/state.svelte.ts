export class ActionState {
  #groupID = $state(0);
  #page = $state(1);
  #perPage = $state(10);

  constructor(query: URLSearchParams) {
    this.#groupID = parseInt(query.get('group_id') ?? '0');
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
  }

  get query() {
    const query = new URLSearchParams();
    if (this.#groupID !== 0) query.set('group_id', this.#groupID.toString());
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    query.sort();

    return query;
  }

  get filter() {
    return {
      groupID: this.#groupID,
      page: this.#page,
      perPage: this.#perPage,
    };
  }
}
