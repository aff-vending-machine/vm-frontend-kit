import { debounce } from '$lib/utils/debounce';
import { writable, type Writable } from 'svelte/store';

const sidebar: Writable<boolean> = writable(true);
const delay = 100;

function toggle() {
  debounce(() => sidebar.update(s => !s), delay)();
}

function open() {
  debounce(() => sidebar.set(true), delay)();
}

function close() {
  debounce(() => sidebar.set(false), delay)();
}

export default { open, close, toggle, ...sidebar };
