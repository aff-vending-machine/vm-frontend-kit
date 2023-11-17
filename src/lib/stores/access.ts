import { type Writable, writable } from 'svelte/store';

import type { AccessStore } from '$types/access';

const access: Writable<AccessStore> = writable();

export default access;
