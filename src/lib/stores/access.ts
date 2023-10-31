import { writable, type Writable } from 'svelte/store';
import type { TokenData } from '$types/auth';

export const access: Writable<TokenData> = writable();
