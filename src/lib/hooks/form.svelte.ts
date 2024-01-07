import { z, ZodError } from 'zod';

import { generateId } from '../helpers/generator';

export class Form<T> {
  #id: string;
  #schema: z.ZodTypeAny;
  #data = $state<T>();
  #valid = $state<boolean>();
  #errors = $state<Record<string, string>>({});

  constructor(schema: z.ZodTypeAny, initialValue: T) {
    this.#id = generateId();
    this.#schema = schema;
    this.#data = initialValue;

    $effect(() => {
      this.#validate();
      return () => {};
    });
  }

  #validate = async () => {
    this.#errors = {};

    try {
      this.#schema.parse(this.#data);
      this.#valid = true;
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.#errors = error.errors.reduce((acc: Record<string, string>, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
      }
      this.#valid = false;
      return false;
    }
  };

  hasError() {
    return Object.keys(this.#errors).length > 0;
  }

  get id() {
    return this.#id;
  }

  get data() {
    return this.#data!;
  }

  get valid() {
    return this.#valid;
  }

  get invalid() {
    return !this.#valid;
  }

  get errors() {
    return this.#errors;
  }
}
