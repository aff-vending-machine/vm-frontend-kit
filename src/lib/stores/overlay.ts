import { type Writable, writable } from 'svelte/store';

import { debounce } from '$lib/utils/debounce';

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
