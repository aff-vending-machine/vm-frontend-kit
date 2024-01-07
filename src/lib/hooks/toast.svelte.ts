import type { ToastType } from '../components/overlays/toasts/state.svelte';

type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

export class ToastStack {
  #stack = $state<Toast[]>([]);

  constructor() {}

  add = (type: ToastType, message: string) => {
    this.#stack.push({ id: crypto.randomUUID(), type, message });
  };

  onClose = (id: string) => {
    this.#stack = this.#stack.filter(s => s.id !== id);
  };

  get stack() {
    return this.#stack;
  }
}
