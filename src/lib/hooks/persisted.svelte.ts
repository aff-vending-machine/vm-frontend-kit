export type Serializer<T> = {
  parse(text: string): T;
  stringify(value: T): string;
};

export type StorageType = 'local' | 'session';

export type Options<T> = {
  serializer?: Serializer<T>;
  storage?: StorageType;
};

type StateMap<T> = Record<string, Persisted<T>>;

type States = {
  local: StateMap<unknown>;
  session: StateMap<unknown>;
};

const states: States = {
  local: {},
  session: {},
};

const DefaultSerializer = <T>() => ({
  parse: (text: string) => {
    try {
      return JSON.parse(text);
    } catch {
      return text; // Assume it's a plain string if it fails to parse as JSON
    }
  },
  stringify: (value: T) => {
    return typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number'
      ? String(value) // Convert primitives directly to strings
      : JSON.stringify(value); // Otherwise, use JSON
  },
});

export class Persisted<T> {
  #serializer: Serializer<T> = DefaultSerializer<T>();
  #storageType: StorageType = 'local';
  #key: string;
  #isBrowser: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';
  #storage = this.#isBrowser ? getStorage(this.#storageType) : null;
  #value = $state<T | null>() as T | null;

  constructor(key: string, initialValue: T | null, options?: Options<T>) {
    this.#key = key;
    this.#value = initialValue;
    this.#storageType = options?.storage ?? 'local';
    this.#serializer = options?.serializer ?? DefaultSerializer<T>();

    const store = states[this.#storageType][key];
    if (store) return states[this.#storageType][key] as Persisted<T>;

    states[this.#storageType][key] = this;

    const json = this.#storage?.getItem(this.#key);
    if (json) {
      this.#value = this.#serializer.parse(json);
    } else {
      this.value = initialValue;
    }

    if ($effect.active()) {
      $effect(() => {
        if (this.#isBrowser && this.#storageType == 'local') {
          window.addEventListener('storage', this.#handleStorage);
        }

        return () => window.removeEventListener('storage', this.#handleStorage);
      });
    }
  }

  #updateStorage(key: string, value: T) {
    this.#storage?.setItem(key, this.#serializer.stringify(value));
  }

  #removeStorage(key: string) {
    this.#storage?.removeItem(key);
  }

  #handleStorage = (e: StorageEvent) => {
    if (e.key === this.#key) {
      this.#value = e.newValue ? this.#serializer.parse(e.newValue) : null;
    }
  };

  set value(v: T | null) {
    if (v === null) {
      this.#removeStorage(this.#key);
      this.#value = null;
      return;
    }

    this.#updateStorage(this.#key, v);
    const json = this.#storage?.getItem(this.#key);
    if (json) {
      this.#value = this.#serializer.parse(json);
    }
  }

  get value() {
    return this.#value as T;
  }
}

function getStorage(type: StorageType) {
  return type === 'local' ? localStorage : sessionStorage;
}
