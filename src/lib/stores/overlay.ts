import { debounce } from '$lib/utils/debounce';
import { writable, type Writable } from 'svelte/store';

const overlay: Writable<boolean> = writable(false);
const delay = 100;

function toggle() {
  debounce(() => overlay.update(s => !s), delay)();
}

function open() {
  debounce(() => overlay.set(true), delay)();
}

function close() {
  debounce(() => overlay.set(false), delay)();
}

export default { open, close, toggle, ...overlay };
