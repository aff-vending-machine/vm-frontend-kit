export class ActionState {
  #machineID = $state(0);
  #search = $state('');
  #stock = $state('');
  #status = $state('');
  #changed = $state('');
  #image = $state('');

  constructor(machineID: number) {
    this.#machineID = machineID;
  }

  get query() {
    const query = new URLSearchParams();
    query.sort();

    return query;
  }

  get filter() {
    return {
      machineID: this.#machineID,
    };
  }

  set search(search: string) {
    this.#search = search;
  }

  get search() {
    return this.#search;
  }

  set status(status: string) {
    this.#status = status;
  }

  get status() {
    return this.#status;
  }

  set stock(stock: string) {
    this.#stock = stock;
  }

  get stock() {
    return this.#stock;
  }

  set changed(changed: string) {
    this.#changed = changed;
  }

  get changed() {
    return this.#changed;
  }

  set image(image: string) {
    this.#image = image;
  }

  get image() {
    return this.#image;
  }
}
