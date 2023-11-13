import type { AccessStore } from '$types/access';
import { writable, type Writable } from 'svelte/store';

const access: Writable<AccessStore> = writable();

export default access;
