export class ActionState {
  #page = $state(1);
  #perPage = $state(10);

  constructor(query: URLSearchParams) {
    this.#page = parseInt(query.get('page') ?? '1');
    this.#perPage = parseInt(query.get('per_page') ?? '10');
  }

  get query() {
    const query = new URLSearchParams();
    query.set('page', this.#page.toString());
    query.set('per_page', this.#perPage.toString());
    query.sort();
    return query;
  }

  get data() {
    return {
      page: this.#page,
      perPage: this.#perPage,
    };
  }
}
