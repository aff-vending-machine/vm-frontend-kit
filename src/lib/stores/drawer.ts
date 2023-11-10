import { debounce } from '$lib/utils/debounce';
import { writable, type Writable } from 'svelte/store';

const drawer: Writable<boolean> = writable(false);
const delay = 100;

function toggle() {
  debounce(() => drawer.update(s => !s), delay)();
}

function open() {
  debounce(() => drawer.set(true), delay)();
}

function close() {
  debounce(() => drawer.set(false), delay)();
}

export default { open, close, toggle, ...drawer };
